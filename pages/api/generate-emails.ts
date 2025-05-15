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

const generateEmailPrompt = ({
  leadName,
  leadTitle,
  company,
  summary,
  niche,
  role,
  offer,
  tone
}: {
  leadName: string;
  leadTitle: string;
  company: string;
  summary: string;
  niche: string;
  role: string;
  offer: string;
  tone: string;
}) => `
You are an expert cold email copywriter with a focus on high-response outreach.

Write a cold email to **${leadName}**, who is the **${leadTitle}** at **${company}**. This person is involved in the following area:  
"${summary}"

The sender is offering:  
"${offer}"

This outreach is targeted at people in the **${niche}** space, specifically the **${role}** persona.  
Write in a ${tone.toLowerCase()} tone. Use simple, direct, persuasive language.

### Your goals:
- Personalize the intro based on their title and summary
- Keep the email short (60–120 words max)
- Use a natural, human voice (avoid "AI-speak")
- Include a single clear call to action (e.g., a short call, reply back, or share info)
- Start with a first-line hook that shows you did your research
- No subject line needed unless requested

### Output format:
Just return the email body, no headers or explanations.
`;

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
      const prompt = generateEmailPrompt({
        leadName: lead.name,
        leadTitle: lead.title,
        company: lead.company,
        summary: lead.summary,
        niche: inputs.niche,
        role: inputs.role,
        offer: inputs.offer,
        tone: inputs.tone
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert cold email copywriter. Generate compelling, personalized cold emails that drive responses."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content || '';
      
      // Since we're not asking for a subject line, we'll generate one based on the first line
      const firstLine = response.split('\n')[0].trim();
      const subject = firstLine.length > 50 
        ? firstLine.substring(0, 47) + '...'
        : firstLine;
      
      emails.push({
        subject,
        body: response.trim(),
        leadName: lead.name
      });
    }

    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error generating emails:', error);
    res.status(500).json({ error: 'Failed to generate emails' });
  }
} 