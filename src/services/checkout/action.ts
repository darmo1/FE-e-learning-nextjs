"use server";

import { redirect } from "next/navigation";

export const checkoutAction = async ({
  product,
}: {
  product: { name: string; unitAmount: number };
}) => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const session = await res.json();
 
  redirect(session.url);
};
