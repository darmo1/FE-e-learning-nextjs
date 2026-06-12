"use server";

import { revalidatePath } from "next/cache";
import { unstable_rethrow } from "next/navigation";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { ActionResult, actionFailure, actionSuccess } from "../types";
import type {
  Company,
  CompanyCourse,
  CompanyStats,
  CreateCompanyInput,
  InviteInfo,
  UpdateCompanyInput,
} from "./types";

const format = (template: string, ...args: (string | number)[]) =>
  args.reduce<string>(
    (acc, value, i) => acc.replace(`{${i}}`, String(value)),
    template
  );

export const getCompanies = async () => {
  return requestHandler<Company[]>({ url: ENDPOINT.COMPANIES });
};

export const getCompany = async (companyId: number) => {
  return requestHandler<Company>({
    url: format(ENDPOINT.COMPANY_BY_ID, companyId),
  });
};

export const createCompanyAction = async (
  input: CreateCompanyInput
): Promise<ActionResult<Company>> => {
  try {
    const { data } = await requestHandler<Company>({
      url: ENDPOINT.COMPANIES,
      method: "POST",
      body: input,
    });
    revalidatePath("/dashboard");
    return actionSuccess(data, "Empresa creada");
  } catch (error) {
    console.error("Error creating company:", error);
    unstable_rethrow(error);
    return actionFailure(
      error instanceof Error ? error.message : "No se pudo crear la empresa",
      error
    );
  }
};

export const updateCompanyAction = async (
  companyId: number,
  input: UpdateCompanyInput
): Promise<ActionResult<Company>> => {
  try {
    const { data } = await requestHandler<Company>({
      url: format(ENDPOINT.COMPANY_BY_ID, companyId),
      method: "PATCH",
      body: input,
    });
    revalidatePath("/dashboard");
    return actionSuccess(data, "Empresa actualizada");
  } catch (error) {
    console.error("Error updating company:", error);
    unstable_rethrow(error);
    return actionFailure(
      error instanceof Error ? error.message : "No se pudo actualizar la empresa",
      error
    );
  }
};

export const regenerateInviteTokenAction = async (
  companyId: number
): Promise<ActionResult<Company>> => {
  try {
    const { data } = await requestHandler<Company>({
      url: format(ENDPOINT.COMPANY_REGENERATE_TOKEN, companyId),
      method: "POST",
    });
    revalidatePath("/dashboard");
    return actionSuccess(data, "Link de invitación regenerado");
  } catch (error) {
    console.error("Error regenerating invite token:", error);
    unstable_rethrow(error);
    return actionFailure("No se pudo regenerar el link", error);
  }
};

export const getCompanyCourses = async (companyId: number) => {
  return requestHandler<CompanyCourse[]>({
    url: format(ENDPOINT.COMPANY_COURSES, companyId),
  });
};

export const setCompanyCourseAction = async (
  companyId: number,
  courseId: number,
  enabled: boolean
): Promise<ActionResult<null>> => {
  try {
    await requestHandler({
      url: format(ENDPOINT.COMPANY_COURSE_TOGGLE, companyId, courseId),
      method: enabled ? "PUT" : "DELETE",
    });
    revalidatePath("/dashboard");
    return actionSuccess(null, enabled ? "Curso habilitado" : "Curso deshabilitado");
  } catch (error) {
    console.error("Error toggling company course:", error);
    unstable_rethrow(error);
    return actionFailure("No se pudo actualizar el curso", error);
  }
};

export const getCompanyStats = async (companyId: number) => {
  return requestHandler<CompanyStats>({
    url: format(ENDPOINT.COMPANY_STATS, companyId),
  });
};

/** Público: no requiere sesión, lo consume la página del link de invitación. */
export const getInviteInfo = async (
  token: string
): Promise<InviteInfo | null> => {
  try {
    const response = await fetch(format(ENDPOINT.COMPANY_INVITE_INFO, token), {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return (await response.json()) as InviteInfo;
  } catch (error) {
    console.error("Error fetching invite info:", error);
    return null;
  }
};
