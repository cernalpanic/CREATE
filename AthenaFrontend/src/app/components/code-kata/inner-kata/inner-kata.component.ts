import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { KataService } from 'src/app/services/kata.service';
import { Kata } from 'src/models/kata.model';

@Component({
  selector: 'app-inner-kata',
  templateUrl: './inner-kata.component.html',
  styleUrls: ['./inner-kata.component.css']
})
export class InnerKataComponent {
  public kata: Kata;

  constructor(private router: Router, public kataService: KataService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      kata: Kata;
    };
    this.kata = state.kata;
  }

  public async ngOnInit() {

  }
}
