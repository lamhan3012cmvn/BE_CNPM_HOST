const paypal = require('paypal-rest-sdk')

const payment = (body) => {
    try {
        const { price, quantity } = body
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/payment-paypal/success",
                "cancel_url": "http://localhost:3000/payment-paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Ban go",
                        "sku": "1",
                        "price": `${price}`,
                        "currency": "USD",
                        "quantity": `${quantity}`
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": (parseFloat(`${price}`) * parseFloat(`${quantity}`)).toString()
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
                throw error;
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
                throw error;
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