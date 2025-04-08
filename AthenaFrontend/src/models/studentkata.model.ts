//1:1 with Student.cs
export class StudentKata {
    public KataID: any;
    public StudentID: any;
    public UserID: any;
    public Complete: any;
    public CompleteDate: any;
    public CompletionTime: any;
    public StudentCode: any;
    public StudentNotes: any;
    public AdminFeedback: any;


    constructor(studentKata: any) {
        if (studentKata.KataID || studentKata.kataID) {
            this.KataID = studentKata.KataID | studentKata.kataID;
            this.StudentID = studentKata.StudentID | studentKata.studentID;
            this.Complete = studentKata.Complete | studentKata.complete;
            this.CompleteDate = studentKata.CompleteDate | studentKata.completeDate;
            this.CompletionTime = studentKata.CompletionTime | studentKata.completionTime;
            this.StudentCode = studentKata.StudentCode | studentKata.studentCode;
            this.StudentNotes = studentKata.StudentNotes | studentKata.studentNotes;
            this.AdminFeedback = studentKata.AdminFeedback | studentKata.adminFeedback;

        } else {
            this.KataID = '';
            this.StudentID = '';
            this.Complete = false;
            this.CompleteDate = null;
            this.CompletionTime = '';
            this.StudentCode = '';
            this.StudentNotes = '';
            this.AdminFeedback = '';
        }
    }

}

