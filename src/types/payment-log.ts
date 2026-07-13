export interface Payment_log {
  id: number;
  request_method: string | null;
  request_url: string;
  auth_token: string | null;
  request_header: JSON;
  request_payload: JSON;
  order_ref: string | null;
  total_payment: number | null;
  created_at: string | null;
}