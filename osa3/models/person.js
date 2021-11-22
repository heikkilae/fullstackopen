const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Define schema for the persons
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, // uniqueValidator
  },
  number: String,
})

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator)

// Override toJSON method of MongoDB
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Decralaration for the model. 1st parameter is name for the collection objects.
module.exports = mongoose.model('Person', personSchema)