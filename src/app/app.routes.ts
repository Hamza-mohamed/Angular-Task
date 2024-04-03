import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
//eng.hamza mohamed 
export const routes: Routes = [
    
        { path: 'users', component: UsersComponent },

        { path: 'user/:id', component: UserDetailComponent },
    
        { path: '', redirectTo: '', pathMatch: 'full' }
    
];
