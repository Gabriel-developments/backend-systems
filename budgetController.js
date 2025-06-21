// backend/src/controllers/budgetController.js
const BudgetRequest = require('./BudgetRequest');
const { sendEmail } = require('./emailService');

exports.submitBudgetRequest = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Salvar no banco de dados
    const newBudgetRequest = new BudgetRequest({ name, email, subject, message });
    await newBudgetRequest.save();

    // 2. Preparar e enviar e-mail usando o serviço centralizado
    const htmlContent = `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <p><strong>Mensagem:</strong> ${message}</p>
    `;

    // Endereço de e-mail da WellSystems para receber as solicitações
    const recipientEmail = 'gabrielllklll@gmail.com'; 
    const emailSubject = `Nova Solicitação de Orçamento: ${subject}`;

    // Atualizado para usar o novo formato de parâmetros
    await sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      html: htmlContent
    });

    res.status(201).json({ message: 'Solicitação de orçamento enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar solicitação de orçamento:', error);
    res.status(500).json({ message: 'Erro ao processar sua solicitação. Tente novamente mais tarde.' });
  }
};