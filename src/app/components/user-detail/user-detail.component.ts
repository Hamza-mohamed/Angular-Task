import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersApiServiceService } from '../../services/users-api-service.service';
import { Users } from '../../models/users';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user!: Users;
  userID:number=0;
  constructor(private route: ActivatedRoute,private Uservice: UsersApiServiceService,private location:Location
  ) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const ID =Number(params.get('id'));
     this.userID=ID
      if (ID) {
        // setTimeout(() => {
          this.getUserData(this.userID);
        // }, 3000);
      }
    });

  }
  getUserData(id:number) {
    this.Uservice.getUserById(id).subscribe(
      (myData: any) => {
        this.user = myData.data;
        console.log('userDATA fetched successfully', myData);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );

  }
  goBack(): void {
    this.location.back();
  }
}
