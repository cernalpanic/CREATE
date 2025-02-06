import { Role } from "./role.model";

export class AuthToken {
  public TokenID: string;
  public Role: Role;
  public Expires: Date;

  constructor(token: any){
    if (token.tokenID && token.tokenID != null){
      this.TokenID = token.tokenID;
      this.Role = new Role(token.role) || new Role(token.Role);
      this.Expires = new Date(token.expires);
    } else {
      this.TokenID = '00000000-0000-0000-0000-000000000000';
      this.Role = new Role(null);
      this.Expires = new Date();
    }
  }
}
