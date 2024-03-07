export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
};

export type Position = {
  id: number;
  name: string;
};

export type ApiGetParams = {
  page: number;
  count: number;
};
export type ApiPostParams = {
  headers?: { [key: string]: string };
  data: FormData;
};

export type FieldName = "name" | "email" | "phone";
