const mongoose = require('mongoose')

const uri = 'mongodb+srv://tboyjohn17:classwork@cluster0.8oconee.mongodb.net/formvalidation?retryWrites=true&w=majority&appName=Cluster0'


class Database {
    constructor() {}

    // _connect = async () => {
    //     return await mongoose.connect(`${uri}`)
    // };
     _connect = async () => {
     return await mongoose.connect(`${uri}`)
    //   .then(() => {
    //       console.log('Database connection Successful')
    //   })
    //   .catch(err => {
    //       console.error('Database connection error', err)
    //   })
  }
}

// let db =new Database()
// db._connect()

module.exports = Database