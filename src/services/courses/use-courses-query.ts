import { ENDPOINT } from "@/constants/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useCoursesQuery = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const response = await fetch(ENDPOINT.GET_ALL_COURSES);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch {
        return []
      }
    },
    //query configurations
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
