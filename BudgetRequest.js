// backend/src/models/BudgetRequest.js
const mongoose = require('mongoose');

// Define o esquema (schema) para as solicitações de orçamento.
// Um esquema descreve os campos e seus tipos de dados que um documento
// terá em uma coleção do MongoDB.
const budgetRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // O campo 'name' é obrigatório
    trim: true      // Remove espaços em branco do início e fim
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Converte o e-mail para minúsculas
    match: /^\S+@\S+\.\S+$/ // Validação regex simples para formato de e-mail
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Define a data de criação automaticamente
  }
});

// Exporta o modelo Mongoose, que representa a coleção 'budgetrequests' no MongoDB.
// O Mongoose automaticamente pluraliza 'BudgetRequest' para 'budgetrequests'.
module.exports = mongoose.model('BudgetRequest', budgetRequestSchema);