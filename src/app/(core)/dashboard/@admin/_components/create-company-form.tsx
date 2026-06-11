"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createCompanyAction } from "@/services/companies/actions";
import { Loader2, Plus } from "lucide-react";

export const CreateCompanyForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createCompanyAction({
      name: String(formData.get("name") ?? ""),
      max_seats: Number(formData.get("max_seats") ?? 10),
      completion_goal_pct: Number(formData.get("completion_goal_pct") ?? 80),
    });

    setSubmitting(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    form.reset();
    router.refresh();
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <Card>
      <CardContent className="p-4">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 md:flex-row md:items-end"
        >
          <div className="flex-1">
            <label htmlFor="name" className="mb-1 block text-sm text-gray-600">
              Nombre de la empresa
            </label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              placeholder="ACME Corp"
              className={inputClass}
            />
          </div>
          <div className="w-full md:w-36">
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
              defaultValue={10}
              required
              className={inputClass}
            />
          </div>
          <div className="w-full md:w-36">
            <label
              htmlFor="completion_goal_pct"
              className="mb-1 block text-sm text-gray-600"
            >
              Meta (%)
            </label>
            <input
              id="completion_goal_pct"
              name="completion_goal_pct"
              type="number"
              min={0}
              max={100}
              defaultValue={80}
              required
              className={inputClass}
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Crear empresa
          </Button>
        </form>
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
