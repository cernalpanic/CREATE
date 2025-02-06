export class Mentor {
  public FirstName: string;
  public LastName: string;
  public Availability: any;
  public Email: string;
  public JobTitle: string;

  constructor(mentor: any){
    if (mentor.email != null || mentor.Email != null){
      this.FirstName = mentor.firstName || mentor.FirstName;
      this.LastName = mentor.lastName || mentor.LastName;
      this.Availability = mentor.availability || mentor.Availability;
      this.Email = mentor.email || mentor.Email;
      this.JobTitle = mentor.jobTitle || mentor.JobTitle;
    } else {
      this.FirstName = '';
      this.LastName = '';
      this.Availability = '';
      this.Email = '';
      this.JobTitle = '';
    }
  }
}
