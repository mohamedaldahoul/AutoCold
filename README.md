# AutoCold - AI-Powered Cold Email Generator

AutoCold is a web application that helps freelancers and agencies generate personalized cold emails using AI. The app uses OpenAI's GPT-4 to create tailored email content based on user input and dummy lead data.

## Features

- Generate personalized cold emails for multiple leads
- Customize email tone (friendly, professional, witty)
- Copy generated emails to clipboard
- Clean, modern UI with Tailwind CSS

## Tech Stack

- Next.js (frontend/backend)
- Tailwind CSS (styling)
- OpenAI API (email generation)
- TypeScript

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/autocold.git
   cd autocold
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter your target niche (e.g., SaaS, E-commerce)
2. Specify the target role (e.g., CMO, CEO)
3. Describe your offer
4. Select the desired tone
5. Click "Generate Emails"
6. Copy the generated emails to your clipboard

## Future Enhancements

- Add live lead scraping
- Implement user authentication
- Add email tracking
- Integrate with email service providers
- Add A/B testing for email variations

## License

MIT 