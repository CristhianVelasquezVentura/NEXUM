export interface Response<T = unknown> {
  error: boolean;
  data: T;
  code: number;
  type: string;
  msg: string;
}
