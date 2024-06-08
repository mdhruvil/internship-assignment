import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import type { ExtractedMessage } from "./gmail";

const validClassificaionSchema = z.object({
  classification: z.string(),
  confidence: z.number().min(0).max(1),
  reason: z.string(),
});

export type Classification = z.infer<typeof validClassificaionSchema>;

export class Classifier {
  private genAi: GoogleGenerativeAI;

  constructor(private apiKey: string) {
    this.genAi = new GoogleGenerativeAI(apiKey);
  }

  async classify(message: ExtractedMessage) {
    const model = this.genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 0,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const chatSession = model.startChat({
      generationConfig,
    });

    const result = await chatSession.sendMessage(
      this.getPromptFromMessage(message),
    );

    const response = JSON.parse(result.response.text()) as unknown;

    const { success, data, error } =
      validClassificaionSchema.safeParse(response);
    if (!success) {
      console.log(error);
      return null;
    }
    return data;
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
