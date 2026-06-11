"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { updateCompanyAction } from "@/services/companies/actions";
import type { Company } from "@/services/companies/types";
import { Loader2, Save } from "lucide-react";

type CompanySettingsProps = {
  company: Company;
};

export const CompanySettings = ({ company }: CompanySettingsProps) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSaving(true);

    const formData = new FormData(event.currentTarget);
    const result = await updateCompanyAction(company.id, {
      max_seats: Number(formData.get("max_seats")),
      completion_goal_pct: Number(formData.get("completion_goal_pct")),
      is_active: formData.get("is_active") === "on",
    });

    setSaving(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    router.refresh();
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-gray-900">Configuración</h2>
        <p className="text-sm text-gray-500">
          Cupos, meta de finalización y estado del acuerdo.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <label
                htmlFor="max_seats"
                className="mb-1 block text-sm text-gray-600"
              >
                Cupos
              </label>
              <input
                id="max_seats"
                name="max_seats"
                type="number"
                min={0}
                max={10000}
                defaultValue={company.max_seats}
                required
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="completion_goal_pct"
                className="mb-1 block text-sm text-gray-600"
              >
                Meta de finalización (%)
              </label>
              <input
                id="completion_goal_pct"
                name="completion_goal_pct"
                type="number"
                min={0}
                max={100}
                defaultValue={company.completion_goal_pct}
                required
                className={inputClass}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={company.is_active}
              className="h-4 w-4"
            />
            Empresa activa (desactivarla bloquea el acceso corporativo)
          </label>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={saving} className="self-start">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
