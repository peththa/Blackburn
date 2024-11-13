const express = require('express');
const Stripe = require('stripe');
const app = express();
const stripe = Stripe('sk_test_XXXXXXXXXXXXXXXXXXXX'); // Your secret key

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Total Cart Purchase',
                        },
                        unit_amount: 5000, // Amount in cents (example: $50)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://yourdomain.com/success',
            cancel_url: 'https://yourdomain.com/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log('Server running on port 4242'));
