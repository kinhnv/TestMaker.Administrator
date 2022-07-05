export interface IToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  expries_date: Date;
}
