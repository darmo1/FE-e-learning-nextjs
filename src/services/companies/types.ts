/** Wire contract con el BE FastAPI: app/companies/schemas.py */

export type Company = {
  id: number;
  name: string;
  is_active: boolean;
  max_seats: number;
  seats_used: number;
  completion_goal_pct: number;
  invite_token: string;
};

export type CreateCompanyInput = {
  name: string;
  max_seats: number;
  completion_goal_pct: number;
};

export type UpdateCompanyInput = Partial<CreateCompanyInput> & {
  is_active?: boolean;
};

export type CompanyCourse = {
  course_id: number;
  title: string;
  enabled: boolean;
};

export type CourseStats = {
  course_id: number;
  course_title: string;
  enrolled: number;
  completed: number;
  avg_progress_pct: number;
  completion_pct: number;
  goal_pct: number;
  /** null cuando el curso aún no tiene inscritos */
  goal_met: boolean | null;
};

export type CompanyStats = {
  company_id: number;
  company_name: string;
  is_active: boolean;
  seats_used: number;
  max_seats: number;
  goal_pct: number;
  courses: CourseStats[];
};

/** Lo que ve públicamente quien abre un link de invitación. */
export type InviteInfo = {
  company_name: string;
  seats_available: boolean;
  courses: string[];
};
