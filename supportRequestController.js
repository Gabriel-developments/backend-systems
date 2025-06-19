// backend/src/controllers/supportController.js
const SupportRequest = require('./SupportRequest');
const { sendEmail } = require('./emailService'); // Importe o serviço de e-mail

exports.submitSupportRequest = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Salvar no banco de dados
    const newSupportRequest = new SupportRequest({ name, email, subject, message });
    await newSupportRequest.save();

    // 2. Preparar e enviar e-mail usando o serviço centralizado
    const htmlContent = `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <p><strong>Mensagem:</strong> ${message}</p>
    `;

    // Endereço de e-mail da WellSystems para receber as solicitações
    const recipientEmail = 'contato@wellsystems.com.br'; 
    const emailSubject = `Nova Solicitação de Suporte: ${subject}`;

    await sendEmail(recipientEmail, emailSubject, htmlContent);

    res.status(201).json({ message: 'Solicitação de suporte enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar solicitação de suporte:', error);
    res.status(500).json({ message: 'Erro ao processar sua solicitação. Tente novamente mais tarde.' });
  }
};