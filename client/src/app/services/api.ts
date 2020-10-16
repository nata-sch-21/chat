import { Env } from './getEnv';

export interface ApiResponse {
  data?: object;
  error?: boolean;
  message?: string;
}

export interface ApiResponseConfig extends ApiResponse {
  data?: Env;
}

export const fetchConfig = async (): Promise<ApiResponseConfig> => {
  try {
    const res: Response = await fetch('api/config');

    const data = await res.json();
    return { data };
  } catch (e) {
    console.log(e.message);
    return { error: true, message: e.message };
  }
};
