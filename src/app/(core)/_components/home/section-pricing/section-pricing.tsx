import { Conditional } from "@/components/common/conditional";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { v4 as uuid } from "uuid";
import { pricingData } from "../constants";
import Link from "next/link";


export const SectionPricing = () => {
  return (
    <section className="py-12 text-white" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple y transparente
            <br className="hidden sm:inline" />
          </h2>
          <p className="mb-12 text-gray-500 sm:text-lg">
            Elige el plan que mejor se adapte a tus necesidades. No hay
            sorpresas ni cargos ocultos.
            <br className="hidden sm:inline" /> Puedes cancelar en cualquier
            momento.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingData.map(
            ({
              title,
              buttonText,
              features,
              popular,
              suscriptionMonth,
              suscriptionYear,
              href
            }) => {
              return (
                <Card
                  key={uuid()}
                  className={`overflow-hidden ${
                    popular ? "border-2" : "border-0"
                  }  bg-white`}
                >
                  <Conditional test={popular}>
                    <div className="bg-black px-3 py-1 text-center text-xs text-white">
                      MOST POPULAR
                    </div>
                  </Conditional>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-medium">{title}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">
                        {suscriptionMonth}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">
                        {suscriptionYear}
                      </span>
                      <span className="text-gray-500">/year</span>
                    </div>
                    <ul className="mb-6 space-y-2 text-sm text-gray-600">
                      {features.map((feature) => (
                        <li key={uuid()}>{feature}</li>
                      ))}
                    </ul>
                    <Link href={href}>
                    <Button className="w-full rounded-md bg-black text-white hover:bg-gray-800">
                      {buttonText}
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};
