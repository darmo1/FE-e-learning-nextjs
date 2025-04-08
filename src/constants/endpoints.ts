const prefix = process.env.PREFIX || "/api/v1";
const HOST = process.env.HOST_BACKEND || "http://localhost:3005";

export const ENDPOINT = {
  LOGIN: `${HOST}${prefix}/auth/login`,
  GET_COURSES_BY_USER: `${HOST}${prefix}/course`,
  CREATE_COURSE: `${HOST}${prefix}/course/create`,
  CREATE_LESSON: `${HOST}${prefix}/lessons/create`,
  GET_LESSONS_BY_COURSE: `${HOST}${prefix}/lessons`,
  REGISTER: `${HOST}${prefix}/auth/register`,
  ENROLL_COURSE: `${HOST}${prefix}/enrollments`,
  COURSES_ENROLLED: `${HOST}${prefix}/enrollments/user`,
  CHECKOUT_SUCCESS: `${HOST}/checkout/success`,
  USER_INFO: `${HOST}${prefix}/users/info`,
};
