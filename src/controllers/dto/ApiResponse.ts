export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface BaseApiResponse {
  message?: string;
  success: boolean;
}
