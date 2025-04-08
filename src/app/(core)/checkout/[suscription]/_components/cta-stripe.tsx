"use client";

export const CtaStripe = ({
  product,
}: {
  product: { name: string; unitAmount: number };
}) => {
  const handleClick = async () => {
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
  return <button onClick={handleClick}>Conitnuar</button>;
};
