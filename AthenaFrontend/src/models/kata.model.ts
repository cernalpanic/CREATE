export class Kata {

    public KataID: string;
    public Description: string;
    public DateAssigned: Date;
    public KataName: string;

    constructor(kata: any)
    {
      if (kata.kataID || kata.KataID){
        this.KataID = kata.kataID || kata.KataID;
        this.Description = kata.Description || kata.description;
        this.DateAssigned = kata.DateAssigned|| kata.dateassigned;
        this.KataName = kata.KataName || kata.kataname;
      } else {
        this.KataID = '00000000-0000-0000-0000-000000000000';
        this.Description = '';
        this.DateAssigned = new Date();
        this.KataName = '';
      }
    }
}
