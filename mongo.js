/* eslint-disable no-undef */

const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('give password as argument')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url =
  `mongodb+srv://att78:${password}@cluster0.kbolr.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)


if (process.argv.length <= 4) {
  console.log('contacts')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
} else {

  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })
  contact.save().then(() => {
    console.log('contact saved!')
    mongoose.connection.close()
  })

}

