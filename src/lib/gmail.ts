import { ZodError, z } from "zod";

const extractedMessageSchema = z.object({
  sender: z.string(),
  sentTime: z.string(),
  subject: z.string(),
  snippet: z.string(),
  bodyText: z.string().optional(),
  bodyHtml: z.string().optional(),
  id: z.string(),
  labelIds: z.array(z.string()),
});

export class Gmail {
  private readonly BASE_URL = "https://gmail.googleapis.com/gmail/v1/";

  constructor(
    private apiKey: string,
    private accessToken: string,
  ) {}

  async getLastMessagesMeta(count: number) {
    const url = this.getApiUrl("users/me/messages");
    url.searchParams.append("maxResults", count.toString());

    const response = await this.fetchApi<{ messages: MessageMeta[] }>(url);
    return response.messages;
  }

  async getFullMessage(id: string) {
    const url = this.getApiUrl(`users/me/messages/${id}`);
    const response = await this.fetchApi<Message>(url);
    const extractedMessage = this.extractMessage(response);
    if (extractedMessage instanceof ZodError) {
      console.log(extractedMessage.issues);
    }
    return extractedMessage;
  }

  extractMessage(message: Message): ExtractedMessage | ZodError {
    let sender, sentTime, subject, bodyText, bodyHtml;

    for (const header of message.payload.headers)
      switch (header.name) {
        case "From":
          sender = header.value;
          break;
        case "Date":
          sentTime = header.value;
          break;
        case "Subject":
          subject = header.value;
          break;
        default:
          break;
      }

    if (message.payload.body.size > 0) {
      const contentType = message.payload.mimeType;
      if (contentType.includes("text/plain")) {
        bodyText = Buffer.from(
          message.payload.body.data || "",
          "base64",
        ).toString("utf-8");
      } else if (contentType.includes("text/html")) {
        bodyHtml = Buffer.from(
          message.payload.body.data || "",
          "base64",
        ).toString("utf-8");
      }
    } else if (message.payload.parts) {
      for (const part of message.payload.parts) {
        if (part.mimeType === "text/plain") {
          bodyText = Buffer.from(part.body.data || "", "base64").toString(
            "utf-8",
          );
        } else if (part.mimeType === "text/html") {
          bodyHtml = Buffer.from(part.body.data || "", "base64").toString(
            "utf-8",
          );
        }
      }
    }

    const messageData = {
      sender,
      sentTime,
      subject,
      bodyText,
      bodyHtml,
      snippet: message.snippet,
      id: message.id,
      labelIds: message.labelIds,
    };

    const { success, data, error } =
      extractedMessageSchema.safeParse(messageData);

    return success ? data : error;
  }

  async getLastMessages(count: number) {
    const meta = await this.getLastMessagesMeta(count);
    const messages = await Promise.all(
      meta.map((m) => this.getFullMessage(m.id)),
    );
    return messages;
  }

  private getApiUrl(path: string) {
    const url = new URL(this.BASE_URL + path);
    url.searchParams.append("key", this.apiKey);
    return url;
  }

  private async fetchApi<T>(url: URL): Promise<T> {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.accessToken,
    };
    const reponse = await fetch(url, { headers });
    if (!reponse.ok) {
      throw new Error(`${reponse.status} ${reponse.statusText}`);
    }
    return reponse.json() as T;
  }
}

interface MessageMeta {
  id: string;
  threadId: string;
}

interface Message {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: MessagePart;
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}

interface MessagePart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: Header[];
  body: MessagePartBody;
  parts: MessagePart[];
}

interface MessagePartBody {
  attachmentId: string;
  size: number;
  data: string;
}

interface Header {
  name: string;
  value: string;
}

export type ExtractedMessage = z.infer<typeof extractedMessageSchema>;
