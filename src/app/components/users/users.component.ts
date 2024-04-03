import { Users } from './../../models/users';
import { Component, OnInit } from '@angular/core';
import { UsersApiServiceService } from '../../services/users-api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserCardDirective } from '../../Directives/user-card.directive';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule,UserCardDirective],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  Users: Users[] = [];
  pageNumber: number = 1;

  constructor(private Uservice: UsersApiServiceService) { }

  ngOnInit(): void {
    // setTimeout(() => {
      this.getHeroes(this.pageNumber);
    // }, 3000);


  }

  getHeroes(pNum: number): void {
    this.Uservice.getUsers(pNum).subscribe(
      (myData: any) => {
        this.Users = myData.data;
        console.log('users fetched successfully', this.Users);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  NextPage(): void {
    if (this.pageNumber < 2) {
      this.pageNumber++;

      this.getHeroes(this.pageNumber);
    } else {
      this.getHeroes(1);
    }
  }
  PrevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getHeroes(this.pageNumber);
    } else {
      this.getHeroes(1);

    }
  }
}
