export class DailyStandup {
  standupID: number;
  studentID: number;
  userID: number;
  dateCreated: Date;
  yesterdayTask: string;
  todayPlan: string;
  blockers: string;
  adminFeedback: string;

  constructor(standupID: number, studentID: number, userID: number, dateCreated: Date, yesterdayTask: string, todayPlan: string, blockers: string, adminFeedback: string) {
    this.standupID = standupID;
    this.studentID = studentID;
    this.userID = userID;
    this.dateCreated = new Date(dateCreated);
    this.yesterdayTask = yesterdayTask;
    this.todayPlan = todayPlan;
    this.blockers = blockers;
    this.adminFeedback = adminFeedback;
  }

  get getStandupId(): number {
    return this.standupID;
  }
  get getStudentId(): number {
    return this.studentID;
  }
  get getUserId(): number {
    return this.userID;
  }
  get getDateCreated(): Date {
    return this.dateCreated;
  }
  get getYesterdayTask(): string {
    return this.yesterdayTask;
  }
  get getTodayPlan(): string {
    return this.todayPlan;
  }
  get getBlockers(): string {
    return this.blockers;
  }
  get getAdminFeedback(): string {
    return this.adminFeedback;
  }

  set setStandupId(standupID: number) {
    this.standupID = standupID;
  }
  set setStudentId(studentID: number) {
    this.studentID = studentID;
  }
  set setUserId(userID: number) {
    this.userID = userID;
  }
  set setDateCreated(dateCreated: Date) {
    this.dateCreated = dateCreated;
  }
  set setYesterdayTask(yesterdayTask: string) {
    this.yesterdayTask = yesterdayTask;
  }
  set setTodayPlan(todayPlan: string) {
    this.todayPlan = todayPlan;
  }
  set setBlockers(blockers: string) {
    this.blockers = blockers;
  }
  set setAdminFeedback(adminFeedback: string) {
    this.adminFeedback = adminFeedback;
  }
}
