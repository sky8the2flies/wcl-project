import { AxiosPromise, AxiosResponse } from "axios";

export type Resolved<D = any> = {
  headers: any;
  data: D | null;
  error: any | null;
};

export const resolve = async <D = any>(
  promise: AxiosPromise
): Promise<Resolved<D>> => {
  const resolved: Resolved<D> = { headers: null, data: null, error: null };

  try {
    const data = await promise;
    resolved.data = data.data;
    resolved.headers = data.headers;
  } catch (error: any) {
    resolved.error = error;
  }

  return resolved;
};
