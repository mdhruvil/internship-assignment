import { OpenAI } from "openai";
import type { ExtractedMessage } from "./gmail";
import { z } from "zod";

const validClassificaionSchema = z.object({
  classification: z.enum([
    "IMPORTANT",
    "PROMOTION",
    "SOCIAL",
    "MARKETING",
    "NEWSLETTER",
    "BILLING",
    "LEGAL_UPDATE",
    "SPAM",
    "GENERAL",
  ]),
  confidence: z.number().min(0).max(1),
  reason: z.string(),
});

export type Classification = z.infer<typeof validClassificaionSchema>;

export class Classifier {
  private openai: OpenAI;

  constructor(private apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  private async openAICompletion(
    messages: OpenAI.ChatCompletionMessageParam[],
  ) {
    console.log(messages);
    return this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "json_object",
      },
    });
  }

  async classify(message: ExtractedMessage) {
    const prompt = this.getPromptFromMessage(message);
    const response = await this.openAICompletion([
      {
        role: "system",
        content: "You are assistant that helps classify emails.",
      },
      { role: "user", content: prompt.trim() },
    ]);
    console.log(response);
    const classification = response.choices[0]?.message.content;
    if (!classification) {
      return null;
    }
    const parsed = validClassificaionSchema.safeParse(classification);
    if (!parsed.success) {
      console.log(parsed.error);
      return null;
    }
    return parsed.data;
  }

  private getPromptFromMessage(message: ExtractedMessage) {
    return `
    Classify the following mail.
    Return a JSON object with "classification", "confidence" and "reason" fields.
These are the possible classifications:
IMPORTANT: Emails that are personal or work-related and require immediate attention.
PROMOTION: Emails related to sales, discounts, and marketing campaigns.
SOCIAL: Emails from social networks, friends, and family.
MARKETING: Emails related to marketing, and notifications.
NEWSLETTER: Regular emails containing updates, articles, or news from organizations, typically subscribed to by the recipient.
BILLING: Emails related to invoices, receipts, payment reminders, or financial transactions.
LEGAL_UPDATE: Emails related to legal documents, such as contracts, agreements,terms of service, or privacy policies.
SPAM: Unwanted or unsolicited emails.
GENERAL: If none of the above are matched, use General.

An example classification would be something like this:
{
    "classification": "LEGAL_UPDATE",
    "confidence": 0.9,
    "reason": "The email is about changes to terms of service."
}

The email is:
---
from: ${message.sender}
subject: ${message.subject}
date: ${message.sentTime}
body: ${message.bodyText}
html: ${message.bodyHtml}
---
    `;
  }
}
