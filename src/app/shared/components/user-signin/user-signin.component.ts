import { SigninComponent } from '../../../signup-signin/signin/signin.component';
import { SigninPasswordComponent } from '../../../signup-signin/signin-password/signin-password.component';

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { EmailExistsValidator } from '../../validators/emailExist.validator';

@Component({
  selector: 'app-user-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    SigninComponent,
    SigninPasswordComponent],
  templateUrl: './user-signin.component.html',
  styleUrl: './user-signin.component.scss'
})
export class UserSigninComponent {
  public mainHeader: string = 'Sign in';
  public subTitle: string = 'to continue to YouTube';
  public signinType: string = 'email';
  public enteredEmail: string = '';

  public signinForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private emailExistsValidator: EmailExistsValidator) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required], [this.emailExistsValidator.userNotFoundValidator()]],
      password: ['', [Validators.required]],
    });
    console.log('signin:', this.signinForm)
  }

  getData(event: any) {
    this.mainHeader = event?.mainHeader;
    this.subTitle = event?.subTitle;
    this.signinType = event?.signinType;
    this.enteredEmail = event?.enteredEmail;
  }

  goToSignInEmail() {
    this.mainHeader = 'Sign in';
    this.subTitle = 'to continue to YouTube';
    this.enteredEmail = this.enteredEmail;
    this.signinType = 'email';
  }

}
