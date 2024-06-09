# Assignment for slidesai.io internship

### **DEMO**: [https://youtu.be/rer3ePVRg_4](https://youtu.be/rer3ePVRg_4)

NOTE: If it says unauthorized after sometime, just sign out and sign in again. Refresh token will be updated.

If you don't select me. Please tell me where I lack and How can I improve.

## How it works

- User login with gmail and give permission to access his gmails
- User Enter the gemini ai api key
- User can see last X emails
- User can classify them with gemini

## How email classification works

prompt :

```ts
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
```

TODO:

- [x] Make a basic ui (shadcn ui)
- [x] Get top x messages from gmail
- [x] Classify them with Gemini
- [x] Display the result
- [x] Make route to display email (parellel routing)
- [ ] Automatically refresh token

## Tech stack

- [Next.js](https://nextjs.org/)
- [Hono](https://hono.dev/)
- [Gmail API](https://developers.google.com/gmail/)
- [Gemini AI](https://gemini.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://github.com/shadcn/ui)
- [Typescript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)

## folder structure

```
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts // auth route
│   │   │   └── v1
│   │   │       └── [[...route]]
│   │   │           └── route.ts // api route
│   │   ├── emails
│   │   │   ├── [id] // display email details
│   │   ├── layout.tsx
│   │   ├── page.tsx // display all emails
│   ├── components
│   ├── env.js
│   ├── lib // gmail api, open ai api logic lives here
│   ├── server
│   │   ├── api // hono api
│   │   ├── auth.ts // auth config
│   │   └── db // db config
│   └── styles
```

## How to run locally:

```bash
git clone https://github.com/mdhruvil/slides-ai-assignment
pnpm install

# MAKE SURE YOU HAVE ALL THE ENV VARS SET.
# READ ALL INSTRUCTIONS IN .env.example
mv .env.example .env
pnpm db:push
pnpm dev
```
