const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://heikkilae:${password}@cluster0.fn7m5.mongodb.net/persons-app?retryWrites=true`
mongoose.connect(url)

// Define schema for the persons
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Decralaration for the model. 1st parameter is name for the collection objects.
const Person = mongoose.model('Person', personSchema)

// List persons
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })

    mongoose.connection.close()
  })

// Add person
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then( () => {
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}


