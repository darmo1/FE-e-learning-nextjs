const prefix = process.env.PREFIX || "/api/v1";
const HOST = process.env.HOST_BACKEND || "http://localhost:3005";
const CLIENT_HOST = process.env.NEXT_PUBLIC_HOST_BACKEND || "http://localhost:3005"

export const ENDPOINT = {
  LOGIN: `${CLIENT_HOST}${prefix}/auth/login`,
  GET_COURSES_BY_USER: `${HOST}${prefix}/course`,
  GET_COURSE_BY_COURSE_ID: `${HOST}${prefix}/course/{0}`,
  GET_COURSES_BY_INSTRUCTOR: `${HOST}${prefix}/course/instructor`,
  CREATE_COURSE: `${HOST}${prefix}/course/create`,
  EDIT_COURSE: `${HOST}${prefix}/course/update/{0}`,
  CREATE_LESSON: `${HOST}${prefix}/lessons/create`,
  UPDATE_LESSON: `${HOST}${prefix}/lessons/edit/{0}`,
  GET_LESSONS_BY_COURSE: `${HOST}${prefix}/lessons`,
  REGISTER: `${HOST}${prefix}/auth/register`,
  ENROLL_COURSE: `${HOST}${prefix}/enrollments`,
  COURSES_ENROLLED: `${HOST}${prefix}/enrollments/user`,
  CHECKOUT_SUCCESS: `${HOST}/checkout/success`,
  USER_INFO: `${HOST}${prefix}/users/info`,
  REFRESH_TOKEN: `${HOST}${prefix}/auth/refresh`,
  ANALYTICS_COURSES_BY_INSTRUCTOR: `${HOST}${prefix}/analytics/instructor/courses`,
  ANALYTICS_SUMMARY_COURSES_BY_INSTRUCTOR: `${HOST}${prefix}/analytics/instructor/summary`,
  GET_ALL_COURSES: `${CLIENT_HOST}${prefix}/course/all`,
};
