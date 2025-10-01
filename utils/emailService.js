import nodemailer from 'nodemailer';

// Create transporter - FIXED: createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // port: 465,
  port: 587,
  // secure: true, // use SSL
  secure: false, // use TLS
  // service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendContactNotification = async (contact) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'mathsphereacademy24@gmail.com',
      subject: `New Demo Request: ${contact.name}`,
      html: `
        <h3>New Demo Class Request</h3>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Grade:</strong> ${contact.grade}</p>
        <p><strong>Board:</strong> ${contact.board}</p>
        <p><strong>Date:</strong> ${new Date(contact.date).toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
};

export const sendConfirmationEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Thank you for your demo request - MathSphere Academy',
      html: `
        <h3>Hello ${userName},</h3>
        <p>Thank you for requesting a demo class with MathSphere Academy!</p>
        <p>We have received your request and will contact you within 24 hours to schedule your free demo class.</p>
        <br>
        <p>Best regards,<br>MathSphere Academy Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

