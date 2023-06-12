import {User} from "@app/core/models/user";

export interface Token {
  document: number;
  exp: number;
  signer: number;
  user: User;
}
