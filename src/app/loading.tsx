import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center text-black font-semibold  flex-1">
      <span className="text-4xl">Cargando la pagina</span>
      <Loader2 className="mx-2 h-12 w-12 animate-spin" />
    </div>
  );
}
