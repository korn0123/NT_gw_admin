export interface Order {
  order_ref: string;
  order_ref2: string | null;
  custommer_id: number | null;
  channel_product_code: string;
  channel_service_code: string;
  total_unit: number;
  total_price: number;
  total_vat: number;
  total_payment: number;
  document_type_code: string;
  tax_id_type: string;
  mobile: string;
  transaction_ref: string | null;
  payment_status: string | null;
  payment_method: number | null;
  request_ex_no: string | null;
  payment_url: string | null;
  add_time: string;
  modify_time: string;
  escode: string | null;
  inno_sub: number | null;
  inno_sub2: number | null;
  payment_type: number | null;
}