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
    return response.messages
  }

  async getFullMessage(id: string) {
    const url = this.getApiUrl(`users/me/messages/${id}`);
    const response = await this.fetchApi<Message>(url);
    return response;
  }

  async getLastMessages(count: number) {
    const meta = await this.getLastMessagesMeta(count);
    const messages = await Promise.all(meta.map(m => this.getFullMessage(m.id)));
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
  size: number;
}

interface Header {
  name: string;
  value: string;
}