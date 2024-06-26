import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { UserSignupSigninService } from '../shared/services/user-signup-signin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('input') inputElement!: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  isLoggedIn: boolean = false;
  signinBtn: string = 'Sign in';
  userId: string | null = '';

  constructor(private router: Router, private userSignupSigninService: UserSignupSigninService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isLoggedIn = true;

      this.cd.detectChanges();
      const userEmailId = localStorage.getItem('uid');
      if (userEmailId) {
        this.userSignupSigninService.getUserDetails(userEmailId).subscribe((response) => {
          console.log('response:', response);
          this.signinBtn = response?.data?.email?.split(' ').map((n: any) => n[0]).join('').toUpperCase();
          this.userId = response?.data?._id;
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

  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value') as any, // Type assertion to avoid TypeScript errors
        distinctUntilChanged<string>(),
        // filter((value: string) => value.length > 2),
        map((value: string) => value)
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  goToSignin() {
    localStorage.setItem('signinClicked', 'true');
    if(localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/user-signin']);
    }
  }

  signout() {
    if (this.userId) {
      this.userSignupSigninService.signout(this.userId).subscribe((response) => {
        console.log('response:', response);
        localStorage.setItem('isLoggedIn','false');
        this.router.navigate(['/user-signin'])
      }, error => {
        console.error('Error fetching user details:', error);
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }
}
