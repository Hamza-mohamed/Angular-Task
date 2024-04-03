import { Component, Input, OnInit } from '@angular/core';
import { UsersApiServiceService } from '../../services/users-api-service.service';
import { Users } from '../../models/users';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit{
  @Input() searchQuery!: string;
  users: Users[] = [];

  constructor(private userService: UsersApiServiceService) {}
  ngOnInit(): void {
    console.log(this.searchQuery,"kiiiiiiiii");
    
    if (this.searchQuery) {
      this.searchUsersByFirstName(this.searchQuery);
    }
  }

  searchUsersByFirstName(firstName: string): void {
    this.userService.searchUsersByFirstName(firstName).subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
        this.users = [];
      }
    );
  }
}
