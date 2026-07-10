export interface User {
  id: number;
  image: string | null;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  id_card: string;
  phone: string;
  address: string | null;
  role: string;
  authorize_token: string | null;
  remark: string | null;
  status: string;
  created: string;
  updated: string;
}