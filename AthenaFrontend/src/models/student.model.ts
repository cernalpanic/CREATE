//1:1 with Student.cs
export class Student {
  public FirstName: string;
  public LastName: string;
  public Availability: any;
  public Email: string;
  public Exp: number;
  public CurrentStandupStreak: number;
  public LongestStandupStreak: number;
  public Rank: string;


  constructor(student: any) {
    if (student.email != null || student.Email != null) {
      this.FirstName = student.firstName || student.FirstName;
      this.LastName = student.lastName || student.LastName;
      this.Availability = student.availability || student.Availability;
      this.Email = student.email || student.Email;
      this.Exp = student.exp || student.Exp;
      this.CurrentStandupStreak = student.currentStandupStreak || student.CurrentStandupStreak;
      this.LongestStandupStreak = student.longestStandupStreak || student.LongestStandupStreak;
      this.Rank = student.rank || student.Rank;
    } else {
      this.FirstName = '';
      this.LastName = '';
      this.Availability = '';
      this.Email = '';
      this.Exp = 0;
      this.CurrentStandupStreak = 0;
      this.LongestStandupStreak = 0;
      this.Rank = '';
    }
  }

  public getRank(totalExp: number, exp: number): any {
    let titles = ['Beginner', 'Amateur', 'Novice', 'Intern', 'Junior Developer', 'Software Developer I',
      'Software Developer II', 'Software Developer III', 'Principal Developer'
    ];

    const step = Math.round(totalExp / titles.length);
    let nextStep = 0;
    let ranks = [];
    let rank = {
      Title: '',
      ExpCap: 0,
      NewRankExp: 0
    };

    for (let i = 0; i < titles.length; i++) {
      ranks.push(titles[i], nextStep);
      if (exp <= nextStep || i == titles.length - 1) {
        rank.Title = titles[i];
        rank.ExpCap = nextStep;
        if (i == titles.length - 1) {
          rank.NewRankExp = 0;
        }
        rank.NewRankExp = (nextStep += step) - exp;
        break;
      } else {
        nextStep += step;
      }
    }
    return rank;
  }
}

