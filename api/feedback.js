// Vercel Serverless Function: /api/feedback
// Sends feedback to your email via Resend API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  const { RESEND_API_KEY, FEEDBACK_TO_EMAIL, FEEDBACK_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !FEEDBACK_TO_EMAIL) {
    res.status(501).json({ success: false, message: 'Email service not configured. Set RESEND_API_KEY and FEEDBACK_TO_EMAIL.' });
    return;
  }

  try {
    const { message, from } = req.body || {};
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      res.status(400).json({ success: false, message: 'Message is required (min 5 chars).' });
      return;
    }

    const mailFrom = FEEDBACK_FROM_EMAIL || 'App Feedback <onboarding@resend.dev>';
    const subject = 'New Feedback from FREQ';
    const text = `Feedback Message:\n\n${message.trim()}\n\nFrom: ${from || 'anonymous'}\n`;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [FEEDBACK_TO_EMAIL],
        subject,
        text,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      res.status(502).json({ success: false, message: `Resend error: ${errText}` });
      return;
    }

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e?.message || 'Unknown error' });
  }
}

