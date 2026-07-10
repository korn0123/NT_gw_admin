export interface Customer {
  id: number;
  es_code: string;
  customer_id: string;
  document_type_code: string;
  tax_id_type: string | null;
  national_id: string | null;
  business_id: string | null;
  branch_id: string | null;
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile: string;
  village: string | null;
  house_no: string | null;
  moo: string | null;
  soi: string | null;
  road: string | null;
  sub_district: string | null;
  district: string | null;
  province: string | null;
  zip_code: string | null;
  office_name: string | null;
  add_time: string;
  modify_time: string;
}