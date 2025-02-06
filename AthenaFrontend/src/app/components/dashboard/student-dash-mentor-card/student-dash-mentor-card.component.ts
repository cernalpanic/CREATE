import { Component, Input } from '@angular/core';
import { Role } from 'src/models/role.model';


@Component({
  selector: 'app-student-dash-mentor-card',
  templateUrl: './student-dash-mentor-card.component.html',
  styleUrls: ['./student-dash-mentor-card.component.css']
})
export class StudentDashMentorCardComponent {
  @Input() mentors: Role[] = [];
  @Input() role: any;

  constructor() { }
}
