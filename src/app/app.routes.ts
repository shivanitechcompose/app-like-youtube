import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSigninComponent } from './shared/components/user-signin/user-signin.component';
import { UserSignupComponent } from './shared/components/user-signup/user-signup.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user-signin', component: UserSigninComponent },
  { path: 'user-signup', component: UserSignupComponent}
];
