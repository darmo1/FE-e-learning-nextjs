import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { cache } from "react";



export const getAnalyticsCoursesByInstructor = cache(async () => {

  const { data: courseTable } = await requestHandler({
    url: ENDPOINT.ANALYTICS_COURSES_BY_INSTRUCTOR,
    method: "GET",
  });
 

  return courseTable;
});

export const getAnalyticsSummaryCoursesByInstructor = cache(async () => {
    const { data: summary } = await requestHandler({
    url: ENDPOINT.ANALYTICS_SUMMARY_COURSES_BY_INSTRUCTOR,
    method: "GET",
  });

  return summary;
});
