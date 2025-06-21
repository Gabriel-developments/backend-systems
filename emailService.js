// backend/src/config/emailService.js
const nodemailer = require('nodemailer');

// Configurações do transporter (pode ser personalizado conforme necessidade)
const createTransporter = () => {
  // Configuração base para serviços comuns
  const baseConfig = {
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Configurações recomendadas para melhor desempenho e segurança
    pool: true, // Usar conexão em pool para melhor performance
    maxConnections: 5, // Número máximo de conexões simultâneas
    maxMessages: 10, // Número máximo de mensagens por conexão
    rateDelta: 1000, // Intervalo de tempo para controle de taxa
    rateLimit: 5, // Limite de envios por rateDelta
    secure: true, // Usar TLS por padrão
    tls: {
      // Configurações de segurança recomendadas
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA'
    },
    logger: process.env.NODE_ENV !== 'production', // Logar atividades em desenvolvimento
    debug: process.env.NODE_ENV !== 'production' // Saída debug em desenvolvimento
  };

  // Configurações específicas para serviços conhecidos
  const serviceConfigs = {
    gmail: {
      port: 465,
      secure: true,
    },
    outlook: {
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // TLS requer secure: false inicialmente
      requireTLS: true,
    },
    yahoo: {
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
    },
    sendgrid: {
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true,
    }
  };

  // Seleciona configuração específica se disponível
  const service = process.env.EMAIL_SERVICE?.toLowerCase();
  const specificConfig = serviceConfigs[service] || {};

  return nodemailer.createTransport({
    ...baseConfig,
    ...specificConfig
  });
};

// Cache do transporter para reutilização
let transporter;

// Função para verificar a conexão SMTP
const verifyConnection = async () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  
  try {
    await transporter.verify();
    console.log('Servidor SMTP configurado e pronto para mensagens');
    return true;
  } catch (error) {
    console.error('Erro ao verificar conexão SMTP:', error);
    throw new Error('Falha na conexão com o servidor SMTP. Verifique as configurações.');
  }
};

// Função principal para envio de e-mails
const sendEmail = async ({ to, subject, html, text, attachments = [] }) => {
  if (!transporter) {
    transporter = createTransporter();
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Pode ser customizado
      to: Array.isArray(to) ? to.join(', ') : to, // Aceita array ou string
      subject: subject,
      html: html,
      text: text || html.replace(/<[^>]*>/g, ''), // Fallback para texto simples
      attachments: attachments,
      priority: 'normal', // ou 'high'/'low'
      headers: {
        'X-Priority': '3', // Padrão de prioridade para clientes de e-mail
        'X-Mailer': 'NodeMailer'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', {
      messageId: info.messageId,
      to: to,
      subject: subject
    });
    
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', {
      error: error.message,
      to: to,
      subject: subject
    });
    throw new Error(`Falha ao enviar e-mail: ${error.message}`);
  }
};

// Função para enviar e-mail com template (opcional)
const sendTemplateEmail = async ({ to, subject, template, context = {}, attachments = [] }) => {
  // Implementação básica - pode ser integrado com um motor de templates como Handlebars
  let html = template;
  for (const [key, value] of Object.entries(context)) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  
  return sendEmail({ to, subject, html, attachments });
};

module.exports = {
  sendEmail,
  sendTemplateEmail,
  verifyConnection,
  transporter: () => transporter || createTransporter() // Exporta o transporter para uso externo se necessário
};