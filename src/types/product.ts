export interface Product {
  id: number;
  es_code: string;
  product_name: string;
  hana_account_code: string;
  hana_product_code: string;
  hana_sub_product_code: string;
  hana_revenue_type: string;
  ecc_account_code: string;
  ecc_account_name: string;
  ecc_product_code: string;
  ecc_product_name: string;
  channel_product_code: string;
  channel_service_code: string | null;
  product_token: string;
  add_time: string;
  modify_time: string;
  message_url: string | null;
  bank_url: string | null;
}