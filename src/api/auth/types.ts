export type TokenResponse = {
  status: number;
  message: string;
  data: {
    token: string;
    expiresIn: number;
  }[];
};