import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { featureCards } from "../constants";

export const SectionFeatures = () => {
  return (
    <section className="py-20" id="features">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-white">
            ¿Por qué elegir nuestra plataforma?
          </h2>
          <p className="mb-12 text-gray-500 sm:text-lg">
            Nuestros cursos están diseñados para proporcionar la mejor
            experiencia de aprendizaje
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, i) => (
            <Card
              key={i}
              className={`overflow-hidden border-0 bg-gradient-to-br ${feature.gradient}`}
            >
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
