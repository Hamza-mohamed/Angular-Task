// search.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { UsersApiServiceService } from '../../services/users-api-service.service';
import { Users } from '../../models/users';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'; // Import MatDialog for modal
import { SearchResultModalComponent } from '../search-result-modal/search-result-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  // @Input() searchQuery!: string;
  users: Users[] = [];
  username: string = '';
  searchResult: any;
  loading: boolean = false; 
  modalRef: MatDialogRef<SearchResultModalComponent> | null = null;
  constructor(private userService: UsersApiServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getusers()
  }

  getusers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe((myData: any) => {
      this.users = myData.data;
      console.log('users fetched successfully', this.users);
    },
      error => {
        console.error('Error fetching users:', error);
        this.loading = false;
      })
  }

  search() {
    if (this.username) {
      const filteredData = this.users.filter(item => {
        // Assuming 'first_name' is the property you want to search against
        return item.first_name.toLowerCase().includes(this.username.toLowerCase());
      });

      if (filteredData.length > 0) {
        if (!this.modalRef) {
          this.modalRef = this.openModal(filteredData);
        } else {
          this.updateModalContent(filteredData);
        }
      } else {
        this.closeModal();
      }
    } else {
      this.closeModal();
    }
  }

  openModal(searchResult: any[]): MatDialogRef<SearchResultModalComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { searchResult };
    dialogConfig.position = {
      top: '0.5%',
      left: '5%',
      right:'25%'
    };
    return this.dialog.open(SearchResultModalComponent, dialogConfig);
  }

  updateModalContent(searchResult: any[]) {
    if (this.modalRef) {
      this.modalRef.componentInstance.searchResult = searchResult;
    }
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }
}
