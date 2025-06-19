// backend/src/config/emailService.js
const nodemailer = require('nodemailer');

// Certifique-se de que as variáveis de ambiente estão carregadas (via dotenv no app.js)
// antes de importar este módulo se você for inicializá-lo logo de cara.
// No entanto, é mais seguro inicializar o transporter dentro de uma função se EMAIL_USER/PASS
// não estiverem disponíveis imediatamente quando este arquivo é requerido.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ou outro serviço SMTP (Outlook, Yahoo, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Usuário do seu e-mail (do .env)
    pass: process.env.EMAIL_PASS, // Senha ou senha de aplicativo (do .env)
  },
  // Opcional: Configurações adicionais, como segurança (TLS/SSL)
  // tls: {
  //   rejectUnauthorized: false // Desabilite apenas para teste, nunca em produção com SMTP não confiável
  // }
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // O e-mail de onde a mensagem será enviada
      to: to, // O destinatário
      subject: subject, // O assunto do e-mail
      html: htmlContent, // O corpo do e-mail em HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: %s', info.messageId);
    return true; // Indica sucesso
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Falha ao enviar e-mail. Verifique as credenciais e o servidor SMTP.');
  }
};

module.exports = {
  sendEmail,
};