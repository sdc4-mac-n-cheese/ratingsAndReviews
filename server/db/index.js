const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sdctest');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully")
});


const Reviews = new mongoose.Schema({
  product_id: {type: Number, required: true},
  review_id: {type: Number},
  rating: {type: Number, required: true},
  summary: {type: String, required: true},
  recommend: {type: Boolean, required: true},
  response: {type: String},
  body: {type: String, required: true},
  date: {type: Number}, // <--- revisit
  reviewer_name: {type: String, required: true},
  helpfulness: {type: Number}, // <-- revisit
  reviewer_email: {type: String, required: true},
  photos: [String] // <-- revisit
});

const Ratings = new mongoose.Schema({
  1: {type: Number},
  2: {type: Number},
  3: {type: Number},
  4: {type: Number},
  5: {type: Number},
});

const Recommended = new mongoose.Schema({
  false: {type: Number},
  true: {type: Number},
});

const Meta = new mongoose.Schema({
  product_id: {type: Number, required: true},
  ratings: {type: Ratings},
  recommended: {type: Recommended},
  // characteristics: {type: Characteristics}, // <-- revisit
});

const Characteristics = new mongoose.Schema({
  product_id: {type: Number}, // <--- every product has different characteristic id
  characteristic_id: {type: Number},
  review_id: {type: Number},
  value: {type: Number},
});

const ReviewsModel = mongoose.model('reviews', Reviews);
const MetaRatingsModel = mongoose.model('metaratings', Meta);
const CharacteristicsModel = mongoose.model('characteristics', Characteristics);
