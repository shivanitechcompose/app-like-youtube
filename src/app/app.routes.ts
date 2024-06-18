import { Routes } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';
import { UserSigninComponent } from './shared/components/user-signin/user-signin.component';
import { UserSignupComponent } from './shared/components/user-signup/user-signup.component';
import { ShortsComponent } from './shorts/shorts.component';
import { SidenavComponent } from './sidenav/sidenav.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search-landing', pathMatch: 'full' },
  {
    path: 'search-landing',
    component: SearchContainerComponent,
  },
  {
    path: 'user-signin',
    component: UserSigninComponent,
  },
  {
    path: 'user-signup',
    component: UserSignupComponent,
  },
  {
    path: 'shorts',
    component: ShortsComponent,
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
  }
];
