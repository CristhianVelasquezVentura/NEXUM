export interface Response<T = any> {
  error: boolean;
  data: T;
  code: number;
  type: string;
  msg: string;
}
