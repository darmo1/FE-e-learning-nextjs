export type UserLoginProps = {
  email: string;
  password: string;
};

export type RoleUser = "admin" | "student" | "instructor";

export type ResponseFetchUser = {
  id: number;
  is_active: boolean;
  created_at: Date;
  email: string;
  full_name: string;
  is_admin: boolean;
  role: RoleUser;
  isLogged: boolean;
};
