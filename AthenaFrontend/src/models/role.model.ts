export class Role {
  public RoleID: string;
  public Name: string;
  public Person: any;
  public ImageURL: string;

  constructor(role: any) {
    if (role.roleID != null) {
      this.RoleID = role.roleID;
      this.Name = role.name;
      this.Person = role.person;
      this.ImageURL = role.imageURL;
    }
    else if (role.RoleID != null) {
      this.RoleID = role.RoleID;
      this.Name = role.Name;
      this.Person = role.Person;
      this.ImageURL = role.ImageURL;

    } else {
      this.RoleID = '00000000-0000-0000-0000-000000000000';
      this.Name = '';
      this.Person = null;
      this.ImageURL = role.imageURL || role.ImageURL;
    }
  }
}
