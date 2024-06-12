const mongoose = require('mongoose');

const { Schema } = mongoose;

const placeSchema = new Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  images: { type: Array, required: false },
  price: { type: Number, required: true },
  guess_max: { type: Number, required: true },
  rooms: { type: Number, required: true },
  ammenities: { type: Array, required: true },
});

const Place = mongoose.model('place', placeSchema);

module.exports = Place;
