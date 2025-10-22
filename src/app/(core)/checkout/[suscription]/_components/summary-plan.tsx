import { Badge } from "@/components/ui/badge";
import React from "react";
import { CircleCheck } from 'lucide-react'

export const SummaryPlan = ({
  name,
  unitAmount,
  discount,
  total,
  benefits
}: {
  name: string;
  unitAmount: number;
  discount?: number;
  total?: number;
  benefits?: string[];
}) => {
  return (
    <div className="col-span-1 col-start-1  text-white border-r border-line bg-gradient-to-br from-[#0A0F1C] via-[#111C2D] to-[#1A2942] py-8 px-6 flex flex-col justify-center relative overflow-hidden">
      <div className="w-1/2 mx-auto">
        <Badge
          variant={"outline"}
          className="
        rounded-md py-1 text-align-start flex items-start
        w-full 
        before:w-2 before:h-2 before:rounded-full before:bg-green-500/30
        my-4"
        >
          Plan Actual: {name}
        </Badge>
        <div className="flex flex-col gap-3 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex justify-between items-center text-sm text-brand-gray">
            <span>Precio base</span>
            <span>{unitAmount}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Descuento</span>
            <span>{discount}</span>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between">
            <span className="text-sm text-brand-gray">Total</span>
            <span className="text-lg font-semibold text-white">{total}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center my-4">
        <h3 className="text-sm font-medium mb-4">Tu plan incluye:</h3>
        <ul className="flex flex-col gap-3">
          {
            benefits?.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-brand-gray/90">
                <CircleCheck className="w-4 h-4 ms-2" /> {benefit}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
