import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { mockLeads } from '@/lib/mockData';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { targetNiche, targetRole, offer, tone, selectedLeadIndex } = req.body;

    if (!targetNiche || !targetRole || !offer || !tone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // If selectedLeadIndex is provided and valid, only generate for that lead
    const selectedLeads = selectedLeadIndex !== undefined && Number.isInteger(Number(selectedLeadIndex)) && 
                          Number(selectedLeadIndex) >= 0 && Number(selectedLeadIndex) < mockLeads.length 
                          ? [mockLeads[Number(selectedLeadIndex)]] 
                          : mockLeads;

    const generatedEmails = await Promise.all(
      selectedLeads.map(async (lead) => {
        const prompt = `You are a cold email assistant helping a ${targetRole} write a personalized cold email.

User Offer: ${offer}
Tone: ${tone}
Lead Name: ${lead.name}
Company: ${lead.company}
Summary: ${lead.summary}

Write a short email (100–120 words) with:
- A personal intro
- A clear, simple offer
- A single CTA like "worth a quick chat?"

Output format:
Subject: [Subject line]
Body: [Email body]`;

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a professional cold email writer who creates concise, personalized emails that get responses."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
        });
        const response = completion.choices[0].message?.content ?? '';
        const [subjectLine, ...bodyLines] = response.split('\n');
        const subject = (subjectLine || '').replace('Subject: ', '').trim();
        const body = bodyLines.join('\n').replace('Body: ', '').trim();

        return {
          subject,
          body,
          lead: {
            name: lead.name,
            company: lead.company,
            title: lead.title
          }
        };
      })
    );

    res.status(200).json(generatedEmails);
  } catch (error) {
    console.error('Error generating emails:', error);
    res.status(500).json({ error: 'Failed to generate emails' });
  }
} 