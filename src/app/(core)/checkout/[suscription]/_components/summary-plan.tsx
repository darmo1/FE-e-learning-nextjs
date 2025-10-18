import { Badge } from "@/components/ui/badge";
import React from "react";

export const SummaryPlan = () => {
  return (
    <div className="col-span-1 col-start-1 ">
      <div className="w-1/2 mx-auto">
        <Badge
          variant={"outline"}
          className="
        rounded-md py-1 text-align-start flex items-start
        w-full 
        before:w-2 before:h-2 before:rounded-full before:bg-green-500/30
        "
        >
          Plan Actual
        </Badge>
        <div className="flex flex-col gap-3 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex justify-between items-center text-sm text-brand-gray">
            <span>Precio base</span>
            <span></span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Descuento</span>
            <span></span>
          </div>
          <div className="pt-2 border-t border-white/10">
          <span>Total</span><span></span>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};
