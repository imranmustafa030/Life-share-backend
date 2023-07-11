const PUBLISHABLE_KEY = "ADD_PUBLISHABLE KEY HERE";
const SECRET_KEY =
  "sk_test_51MOhmzFyQh9AGEPs9hjczNImDoIAGLtq3kwOPImdNGyJVQMUWJWE95ZKp5P0xYkvM2u2b4ejJAsoXlr2e09myAPG00jRgJZgxP";
const Stripe = require("stripe");
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });
const paymment_intent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
exports.paymment_intent = paymment_intent;
