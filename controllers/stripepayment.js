const stripe=require('stripe')("sk_test_51GtJbbLGgXC8bhCNxiyjaUzdWp7Bu74rRmgrqvUL3NstNInvXyOHMEiyzKLr3z2iQfOz3xPZLv9AM2hjXKFTQ2f700VdLppnCH");

const uuid=require("uuid/v4");


exports.makepayment=(req,res)=>{

 const {products,token}=req.body
 console.log("PRODUCT",products)

 let amount = 0;
 products.map(p => {
   amount = amount + p.price;
 });

  const idempotencyKey=uuid()
  
  return stripe.customers.create({
      email:token.email,
      source:token.id
  }).then(customer=>{
      stripe.charges.create({
          amount:amount*100,
          currency:'usd',
          customer:customer.id,
          receipt_email:token.email,
          description:"a test account",
          shipping:{
              name:token.card.name,
              address:{
                  line1:token.card.address_line1,
                  line2:token.card.address_line2,
                  city:toke.card.address_city,
                  country:toke.card.address_country,
                  postal_code:token.card.address_zip
              }
          }
      },{idempotencyKey})
      .then(result=>res.status(200).json(result))
      .catch(err=>{
          console.log(err)
      })
  })

 };


