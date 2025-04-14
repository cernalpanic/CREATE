import { Component, Input } from '@angular/core';
import { Kata } from 'src/models/kata.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kata-card',
  templateUrl: './kata-card.component.html',
  styleUrls: ['./kata-card.component.css']
})
export class KataCardComponent {
  @Input() kata: any;

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) { }



}
