import Stripe from "stripe";
import { Config } from "sst/node/config";
import handler from "@notes/core/handler";
import { calculateCost } from "@notes/core/cost";

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key
  const stripe = new Stripe(Config.STRIPE_SECRET_KEY);

  //   await stripe.charges.create({
  //     source,
  //     amount,
  //     description,
  //     currency: "inr",
  //   });

  await stripe.paymentIntents.create({
    amount,
    description,
    currency: "usd",
  });

  return JSON.stringify({ status: true });
});
