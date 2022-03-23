export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface IRequestData {
  code: string;
  client_id: string;
  client_secret: string;
}
