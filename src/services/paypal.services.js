const paypal = require('paypal-rest-sdk')

const payment = (body) => {
    try {
        const { items } = body
        let total = 0
        for (let i = 0; i < items.length; i++) {
            total += parseFloat(items[i].price) * items[i].quantity;
        }
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://localhost:3000/payment-paypal/success?total=${total.toString()}`,
                "cancel_url": "http://localhost:3000/payment-paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": items
                },
                "amount": {
                    "currency": "USD",
                    "total": total.toString()
                },
                "description": "This is the payment description."
            }]
        };


        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                return {
                    message: 'Cannot payment',
                    success: false
                }
            } else {
                console.log("Create Payment Response");
                console.log(payment);
                return {
                    message: 'Successfully payment',
                    success: true,
                    data: payment
                }
            }
        });
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const PaymentSuccess = (payerID, paymentId, price) => {
    try {
        // const payerId = req.query.PayerID;
        // const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                return {
                    message: 'Payment Fail',
                    success: false
                }
            } else {
                console.log(JSON.stringify(payment));
                //res.send('Success');
                return {
                    message: 'Successfully payment',
                    success: true,
                    data: payment
                }
            }
        });


    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

const PaymentCancel = () => {
    try {
        return {
            message: 'Cancelled !!',
            success: true
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            success: false
        }
    }
}

module.exports = {
    payment,
    PaymentSuccess,
    PaymentCancel
}