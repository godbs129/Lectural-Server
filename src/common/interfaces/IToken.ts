export interface ITokenPayload {
  uniqueId: string;
}

export interface IToken {
  uniqueId: string;
  iss: string;
  sub: string;
}
