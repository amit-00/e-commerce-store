import * as functions from "firebase-functions";
import admin from "firebase-admin";
import Stripe from "stripe";

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

admin.initializeApp();

/**
 * Creates a stripe checkout session.
 * @param {Stripe.Checkout.SessionCreateParams.LineItem[]} lineItems - items.
 * @return {Stripe.Response<Stripe.Checkout.Session>} session.
 */
export async function createStripeCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
) {
  const url = "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${url}/success`,
    cancel_url: `${url}/failed`,
    mode: "payment",
    allow_promotion_codes: true,
    shipping_address_collection: {
      allowed_countries: ["AF", "AL", "DZ", "AD",
        "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU",
        "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE",
        "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW",
        "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV",
        "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN",
        "CO", "KM", "CD", "CG", "CK", "CR", "HR", "CW",
        "CY", "CZ", "CI", "DK", "DJ", "DM", "DO", "EC",
        "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FK",
        "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA",
        "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD",
        "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT",
        "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IQ",
        "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO",
        "KZ", "KE", "KI", "KR", "KW", "KG", "LA", "LV",
        "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO",
        "MG", "MW", "MY", "MV", "ML", "MT", "MQ", "MR",
        "MU", "YT", "MX", "MD", "MC", "MN", "ME", "MS",
        "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC",
        "NZ", "NI", "NE", "NG", "NU", "NO", "OM", "PK",
        "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL",
        "PT", "PR", "QA", "MK", "RO", "RU", "RW", "RE",
        "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS",
        "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG",
        "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS",
        "ES", "LK", "SR", "SJ", "SE", "CH", "TW", "TJ",
        "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN",
        "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB",
        "US", "UY", "UZ", "VU", "VE", "VN", "VG", "WF",
        "EH", "YE", "ZM", "ZW", "AX"],
    },
  });
  return session;
}

export const stripeCheckout = functions.https.onCall( async (data) => {
  const checkoutSession = await createStripeCheckoutSession(data.line_items);
  return checkoutSession;
});

export const orderWebhook = functions.https.onRequest( async (req, res) => {
  let event;
  try {
    const whSec = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        whSec,
    );
  } catch (err) {
    console.error("webhooks signature verification failed");
    res.sendStatus(400);
    return null;
  }

  const dataObject = event.data.object;
  const pre = await stripe.checkout.sessions.listLineItems(dataObject.id);
  const items = await pre.data;
  const products = items.map((prod) => {
    const name = prod.price.nickname;
    const size = prod.description;
    const quantity = prod.quantity;
    const temp = {
      name: name,
      size: size,
      quantity: quantity,
    };
    return temp;
  });
  const docRef = admin.firestore().collection("orders").doc();
  await docRef.set({
    checkoutSessionId: dataObject.id,
    customerEmail: dataObject.customer_details.email,
    paymentStatus: dataObject.payment_status,
    shippingInfo: dataObject.shipping,
    amountTotal: dataObject.amount_total,
    products: products,
    delivered: false,
    orderDate: admin.firestore.Timestamp.now(),
  });
  res.sendStatus(200);
  return null;
});
