import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const leads = [
  {
    name: "Sarah Johnson",
    company: "Bloom Analytics",
    title: "CMO",
    summary: "Leads growth marketing at a 15-person B2B SaaS startup helping eCom brands."
  },
  {
    name: "Michael Chen",
    company: "TechFlow Solutions",
    title: "CEO",
    summary: "Founder of a 50-person AI automation platform serving enterprise clients."
  },
  {
    name: "Emily Rodriguez",
    company: "GrowthHack Labs",
    title: "Marketing Director",
    summary: "Heads digital marketing for a fast-growing marketing automation platform."
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { targetNiche, targetRole, offer, tone } = req.body;

    if (!targetNiche || !targetRole || !offer || !tone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const generatedEmails = await Promise.all(
      leads.map(async (lead) => {
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