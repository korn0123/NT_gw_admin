export interface Order_Item {
  item_id: number;
  order_ref: string;
  es_code: string;
  account_code: string;
  hana_product_code: string;
  hana_product_name: string;
  hana_sub_product_code: string;
  model: string | null;
  company_code: string;
  home_code: string | null;
  production_option1: string | null;
  production_option2: string | null;
  production_option3: string | null;
  unit: number;
  price: number;
  vat: number;
  net_price: number;
  net_vat: number;
  status: string;
  add_time: string;
  modify_time: string;
}