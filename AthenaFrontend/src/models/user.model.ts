export class User {
    public UserID: string;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Password: string;

    constructor(user: any){
        if (user.userID != null) {
        this.UserID = user.userID;
        this.FirstName = user.FirstName; 
        this.LastName = user.LastName;      
        this.Email = user.email;
        this.Password = user.password;
        } else {
        this.UserID = '00000000-0000-0000-0000-000000000000';
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.Password = '';
        }
    }
}