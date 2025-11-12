// Netlify Function: /.netlify/functions/feedback
// Sends feedback to your email via Resend API

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method Not Allowed' }) };
  }

  const { RESEND_API_KEY, FEEDBACK_TO_EMAIL, FEEDBACK_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !FEEDBACK_TO_EMAIL) {
    return { statusCode: 501, body: JSON.stringify({ success: false, message: 'Email service not configured. Set RESEND_API_KEY and FEEDBACK_TO_EMAIL.' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { message, from } = body;
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Message is required (min 5 chars).' }) };
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
      return { statusCode: 502, body: JSON.stringify({ success: false, message: `Resend error: ${errText}` }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: e?.message || 'Unknown error' }) };
  }
}

