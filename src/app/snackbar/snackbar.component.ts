import { Component, Inject, Input, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { UserService } from '../_service/person.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(private userService: UserService,
              @Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  name: string = this.data.split(",")[1];
  id: number = Number(this.data.split(",")[0]);

  showUserData() {
    this.userService.getUserData(this.id, this.name);
  }
}
