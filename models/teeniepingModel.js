const mongoose = require('mongoose');

const teeniepingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  series: { type: String },
  rank: { type: String },
  imageUrl: { type: String },
  description: { type: String },
  items: { type: String },
  magic: { type: String },
  personality: { type: String },
});

const Teenieping = mongoose.model('Teenieping', teeniepingSchema, 'teenieping_collection');

module.exports = Teenieping;
