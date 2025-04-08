'use client';
export const getCheckoutSession = async ({
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
  window.location = session.url;
};
