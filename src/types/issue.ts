export interface Issue {
  issue_id: number;
  item_id: number;
  order_ref: string;
  service_name: string;
  issue_title: string;
  issue_detail: string | null;
  payment_received: boolean;
  frontend_problem: string | null;
  expected_behavior: string | null;
  actual_behavior: string | null;
  issue_status: string;
  resolved_by: string | null;
  resolved_note: string | null;
  add_time: string;
  modify_time: string;
}