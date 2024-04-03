import { RouterModule } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../../models/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-result-modal',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './search-result-modal.component.html',
  styleUrl: './search-result-modal.component.css'
})
export class SearchResultModalComponent {
  searchResult:Users[]=[]
  loading: boolean = true; // Track loading state

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,    public dialogRef: MatDialogRef<SearchResultModalComponent>
  ) { 
    console.log(data.searchResult);
    this.searchResult=data.searchResult
    this.loading = false;
    
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}
