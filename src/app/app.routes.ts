import { Routes } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';
import { UserSigninComponent } from './shared/components/user-signin/user-signin.component';
import { UserSignupComponent } from './shared/components/user-signup/user-signup.component';

export const routes: Routes = [
  { path: '', component: SearchContainerComponent },
  { path: 'user-signin', component: UserSigninComponent },
  { path: 'user-signup', component: UserSignupComponent}
];
