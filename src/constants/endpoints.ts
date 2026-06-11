const prefix = process.env.PREFIX || "/api/v1";

/** Quita espacios y slashes finales: "https://api.com/ " -> "https://api.com".
 * Un slash final en la env var produce URLs "//api/v1/..." que el backend
 * responde con 404. */
const normalizeHost = (url?: string) => {
  const clean = url?.trim().replace(/\/+$/, "");
  return clean || undefined;
};

/** Último recurso si las env vars faltan o quedaron vacías en el hosting. */
const FALLBACK_BACKEND =
  process.env.NODE_ENV === "production"
    ? "https://e-learning-fast-api.fastapicloud.dev"
    : "http://localhost:3005";

const HOST =
  normalizeHost(process.env.HOST_BACKEND) ??
  normalizeHost(process.env.NEXT_PUBLIC_BACKEND_URL) ??
  FALLBACK_BACKEND;

const CLIENT_HOST =
  normalizeHost(process.env.NEXT_PUBLIC_HOST_BACKEND) ?? FALLBACK_BACKEND;

/** Base del backend para llamadas hechas desde el navegador. */
export const CLIENT_BACKEND_HOST = CLIENT_HOST;

export const ENDPOINT = {
  LOGIN: `${HOST}${prefix}/auth/login`,
  GET_COURSES_BY_USER: `${HOST}${prefix}/course`,
  GET_COURSE_BY_COURSE_ID: `${HOST}${prefix}/course/{0}`,
  GET_COURSES_BY_INSTRUCTOR: `${HOST}${prefix}/course/instructor`,
  CREATE_COURSE: `${HOST}${prefix}/course/create`,
  EDIT_COURSE: `${HOST}${prefix}/course/update/{0}`,
  CREATE_LESSON: `${HOST}${prefix}/lessons/create`,
  UPDATE_LESSON: `${HOST}${prefix}/lessons/edit/{0}`,
  GET_LESSONS_BY_COURSE: `${HOST}${prefix}/lessons`,
  REGISTER: `${HOST}${prefix}/auth/register`,
  FORGOT_PASSWORD: `${HOST}${prefix}/auth/forgot-password`,
  RESET_PASSWORD: `${HOST}${prefix}/auth/reset-password`,
  ENROLL_COURSE: `${HOST}${prefix}/enrollments`,
  COURSES_ENROLLED: `${HOST}${prefix}/enrollments/user`,
  PAYMENTS_CREATE_PREFERENCE: `${HOST}${prefix}/payments/create-preference`,
  USER_INFO: `${HOST}${prefix}/users/info`,
  REFRESH_TOKEN: `${HOST}${prefix}/auth/refresh`,
  ANALYTICS_COURSES_BY_INSTRUCTOR: `${HOST}${prefix}/analytics/instructor/courses`,
  ANALYTICS_SUMMARY_COURSES_BY_INSTRUCTOR: `${HOST}${prefix}/analytics/instructor/summary`,
  GET_ALL_COURSES: `${CLIENT_HOST}${prefix}/course/all`,
  // Enterprise (empresas)
  COMPANIES: `${HOST}${prefix}/companies/`,
  COMPANY_BY_ID: `${HOST}${prefix}/companies/{0}`,
  COMPANY_REGENERATE_TOKEN: `${HOST}${prefix}/companies/{0}/regenerate-token`,
  COMPANY_COURSES: `${HOST}${prefix}/companies/{0}/courses`,
  COMPANY_COURSE_TOGGLE: `${HOST}${prefix}/companies/{0}/courses/{1}`,
  COMPANY_STATS: `${HOST}${prefix}/companies/{0}/stats`,
  COMPANY_REPORT: `${HOST}${prefix}/companies/{0}/report`,
  COMPANY_INVITE_INFO: `${HOST}${prefix}/companies/invite/{0}`,
  // Progreso de lecciones
  LESSON_COMPLETE: `${HOST}${prefix}/lessons/complete/{0}`,
  COURSE_PROGRESS: `${HOST}${prefix}/lessons/{0}/progress`,
};
