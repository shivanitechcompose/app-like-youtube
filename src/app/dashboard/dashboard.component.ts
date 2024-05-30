import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignupSigninService } from '../shared/services/user-signup-signin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private userSignupSigninService: UserSignupSigninService) {}
  
  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const userId: string | null = localStorage.getItem('uid');
      if (userId) {
        this.userSignupSigninService.getUserDetails(userId).subscribe((data) => {
          console.log('data:', data);
        }, error => {
          console.error('Error fetching user details:', error);
        });
      } else {
        console.error('User ID not found in local storage');
      }
    } else {
      console.error('User is not logged in');
    }
  }

  goToSignin() {
    this.router.navigate(['/user-signin'])
  }
}
