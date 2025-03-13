import fetch from 'node-fetch';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST requests are allowed' }),
    };
  }

  const { firstName, lastName, email, phone, message, timeline, service, expressMail } = JSON.parse(event.body);

  const API_KEY = process.env.BREVO_API_KEY;
  const url = 'https://api.brevo.com/v3/smtp/email';

  const subject = expressMail 
    ? `🚀 Express Mail: Contact Request from ${firstName} ${lastName}`
    : `New Contact Form Submission from ${firstName} ${lastName}`;

  console.log( firstName, lastName, email, phone, message, timeline, service, expressMail );

  const emailData = {
    sender: { email: 'visionstudios.it@gmail.com' },
    to: [{ email: 'visionstudios.it@gmail.com' }],
    subject: subject,
    htmlContent: `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #93143A;">New Contact Form Submission</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Timeline:</b> ${timeline || 'Not specified'}</p>
        <p><b>Services Interested In:</b> ${service.length > 0 ? service.join(', ') : 'None selected'}</p>
        <p><b>Message:</b> ${message}</p>
        <p style="color: ${expressMail ? '#ff0000' : '#000'};"><b>Express Mail:</b> ${expressMail ? 'Yes' : 'No'}</p>
        <footer style="margin-top: 20px; font-size: 12px; color: #333;">
          Sent from Your Website
        </footer>
      </body>
    </html>
    `,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    const responseBody = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully' }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to send email', error: responseBody }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message }),
    };
  }
};
