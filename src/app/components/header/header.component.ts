import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Users } from '../../models/users';
import { UsersApiServiceService } from '../../services/users-api-service.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  searchForm: FormGroup;

  @Output() searchQuery = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      firstName: ['']
    });
  }

  search(): void {
    const firstName = this.searchForm.value.firstName;
    this.searchQuery.emit(firstName);
  }

}