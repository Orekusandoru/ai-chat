export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userMessage = req.body.message;
    // This grabs your secret key from Vercel's secure vault
    const apiKey = process.env.GEMINI_API_KEY; 

    // Forward the request to Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}