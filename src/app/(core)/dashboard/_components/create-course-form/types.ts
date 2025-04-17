export interface CreateCourseFormWrapperProps {
    id: string;
    title: string;
    description: string;
    category: string;
    instructor_id: number;
    image_url: string | null 
    duration?: string;
    students?: number;
    lessons?: number;
    isFeatured?: boolean;
    price?: number
  }