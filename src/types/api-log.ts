export interface Api_log {
  log_id: number;
  api_name: number;
  order_ref: string | null;
  x_request_id: string | null;
  x_client_ip: string | null;
  request_body: JSON | null;
  response_body: JSON | null;
  status_code: string | null;
  is_success: boolean | null;
  error_message: string | null;
  add_time: string;
  modify_time: string;
  status: string | null;
  result_body: JSON | null;
  transaction_ref: string | null;
  payment_status: string | null;
  payment_method: number | null;
  payment_method_name: string | null;
}