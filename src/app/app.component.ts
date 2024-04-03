import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UsersApiServiceService } from './services/users-api-service.service';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SearchComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-quiz';
  searchQuery!: string;

  constructor(private userService: UsersApiServiceService) {}

  searchUsers(query: string): void {
    this.searchQuery = query;
  }
}
