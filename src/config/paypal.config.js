const paypal = require("paypal-rest-sdk")
const { CLIENT_ID, CLIENT_SECRET } = require('./index')

async function connect() {
    try {
        await paypal.configure({
            'mode': 'sandbox',
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
        });
        console.log("Success Paypal")
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connect }