const express = require("express");
const stripe = require("stripe")("SECRET_KEY");
const uuid = require("uuid");
const router = express.Router();

router.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("Product:", product);
  console.log("price:", product.price);
  const idempontencykey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        idempontencykey
      );
    })
    .then((result) => res.send(200).json(result))
    .catch((err) => console.log(err));
});

module.exports = router;
