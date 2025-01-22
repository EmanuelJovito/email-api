const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS, 
    },
    logger: true,
    debug: true,
  });

  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to,
    subject,
    text: message,
  };

  try {
    console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!', info });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao enviar e-mail.', error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
