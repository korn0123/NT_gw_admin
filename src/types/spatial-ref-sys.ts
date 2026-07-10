export interface Spatial_ref_sys {
  srid: number;
  auth_name: string | null;
  auth_srid: number | null;
  srtext: string | null;
  proj4text: string | null;
  add_time: string;
  modify_time: string;
}