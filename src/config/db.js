const mongoose = require('mongoose')

async function connect() {

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect successfully!')
    } catch (error) {
        console.log('connect fail!!')
    }
}

module.exports = { connect }