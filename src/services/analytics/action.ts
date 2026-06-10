import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { cache } from "react";
import {
  InstructorAnalyticsSummary,
  InstructorCourseAnalyticsRow,
} from "./types";

export const getAnalyticsCoursesByInstructor = cache(async () => {
  const { data: courseTable } = await requestHandler<
    InstructorCourseAnalyticsRow[]
  >({
    url: ENDPOINT.ANALYTICS_COURSES_BY_INSTRUCTOR,
  });

  return courseTable;
});

export const getAnalyticsSummaryCoursesByInstructor = cache(async () => {
  const { data: summary } = await requestHandler<InstructorAnalyticsSummary>({
    url: ENDPOINT.ANALYTICS_SUMMARY_COURSES_BY_INSTRUCTOR,
  });

  return summary;
});
