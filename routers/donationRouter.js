const { donate } = require("../modules/donationModule");
const router = require("express").Router();


router.post("/add-donation", donate);

router.post('/create-checkout-session', async (req, res)=>{
    const Stripe = require('stripe');
    const stripe = Stripe(process.env.STRIPE_SK);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items:[{
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                quantity: 1,
                price_data:{
                    currency: 'INR',
                    product_data:{
                        name: 'donation'
                    },
                    unit_amount: req.body.amount*100
                }
              }],
            success_url: process.env.CLIENT_URL+'/donation/success?da='+req.body.amount,
            cancel_url: process.env.CLIENT_URL+'/donation/failure'
        })

        res.json({url:session.url})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
