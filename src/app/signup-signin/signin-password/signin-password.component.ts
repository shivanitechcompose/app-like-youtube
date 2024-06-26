import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserSigninComponent } from '../../shared/components/user-signin/user-signin.component';
import { UserSignupSigninService } from '../../shared/services/user-signup-signin.service';
@Component({
  selector: 'app-signin-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSigninComponent],
  templateUrl: './signin-password.component.html',
  styleUrl: './signin-password.component.scss'
})
export class SigninPasswordComponent {
  @Input() public signinForm : FormGroup = this.fb.group({})
  hide = true;
  refreshTokeSecretKey = 'localstorage-refresh-token-key';
  accessTokeSecretKey = 'localstorage-access-token-key';

  @Output() public emitSigninMainHeader: EventEmitter<Object> = new EventEmitter();
  passwordIsRequired: boolean = false;
  wrongPassword: boolean = false;
  
  constructor(private fb: FormBuilder, private userSignupSigninService: UserSignupSigninService, private router: Router) {}

  ngOnInit(): void {
    console.log("signinForm", this.signinForm?.value)
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  public goToNext(): void {
    console.log("signinForm", this.signinForm?.value);

    const password = this.signinForm.get('password')?.value;

    if(!password) {
      this.passwordIsRequired = true;
    }
    if(!this.passwordIsRequired) {
      this.userSignupSigninService.login(this.signinForm.value).subscribe(
        response => {
          console.log('user:', response.headers)
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['']);
        },
        error => {
          this.wrongPassword = true;
          console.error('Registration error:', error);
        }
      );
    }
  }

  checkValues() {
    this.passwordIsRequired = false;
    const password = this.signinForm.get('password')?.value;

    if(!password) {
      this.passwordIsRequired = true;
    }
  }
}
