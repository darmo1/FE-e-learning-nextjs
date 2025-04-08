import { ENDPOINT } from "@/constants/endpoints";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY || "");
export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: { name: string; unitAmount: number } = await request.json();

  const session = await stripe.checkout.sessions.create({
    success_url: ENDPOINT.CHECKOUT_SUCCESS,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: body.unitAmount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return NextResponse.json(session);
}
