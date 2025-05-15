import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface EmailRequest {
  leads: Array<{
    name: string;
    title: string;
    company: string;
    summary: string;
  }>;
  inputs: {
    niche: string;
    role: string;
    offer: string;
    tone: string;
  };
}

interface EmailResponse {
  subject: string;
  body: string;
  leadName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { leads, inputs }: EmailRequest = req.body;

    const emails: EmailResponse[] = [];

    for (const lead of leads) {
      const prompt = `Write a cold email to ${lead.name}, the ${lead.title} at ${lead.company}, who is involved in ${lead.summary}. The user is offering: "${inputs.offer}". Use a ${inputs.tone} tone. Target niche is ${inputs.niche}.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert cold email writer. Generate a compelling cold email with a subject line and body. Format the response as JSON with 'subject' and 'body' fields."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      });

      const response = JSON.parse(completion.choices[0].message.content);
      
      emails.push({
        subject: response.subject,
        body: response.body,
        leadName: lead.name
      });
    }

    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error generating emails:', error);
    res.status(500).json({ error: 'Failed to generate emails' });
  }
} 