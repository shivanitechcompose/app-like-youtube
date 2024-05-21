import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SignupNameComponent } from '../../../signup-signin/signup-name/signup-name.component';
import { SignupBasicInfoComponent } from '../../../signup-signin/signup-basic-info/signup-basic-info.component';
import { SignupCreateEmailComponent } from '../../../signup-signin/signup-create-email/signup-create-email.component';
import { SignupPasswordComponent } from '../../../signup-signin/signup-password/signup-password.component';
@Component({
  selector: 'app-user-signup-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    SignupNameComponent,
    SignupBasicInfoComponent,
    SignupCreateEmailComponent,
    SignupPasswordComponent],
  templateUrl: './user-signup-signin.component.html',
  styleUrl: './user-signup-signin.component.scss'
})
export class UserSignupSigninComponent implements OnInit {

  // @Output() formSubmit = new EventEmitter<FormGroup>();

  public mainHeader1: string = 'Create a Google';
  public mainHeader2: string = 'Account';
  public subTitle: string = 'Enter your name';
  public signupType: string = 'name';

  public signupForm: FormGroup = this.fb.group({});
  emailPattern = '^[a-zA-Z0-9.]+$';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      surname: [''],
      dateOfBirthDay: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dateOfBirthMonth: ['', [Validators.required]],
      dateOfBirthYear: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', [Validators.required]],
      // referGender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.]+$"), Validators.minLength(6), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?#&])[a-z0-9\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required]],
    });
    console.log('signuppp:', this.signupForm)
  }

  getData(event: any) {
    this.mainHeader1 = event?.mainHeader1;
    this.mainHeader2 = event?.mainHeader2;
    this.subTitle = event?.subTitle;
    this.signupType = event?.signupType;
  }

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     this.signupForm.value.email = this.signupForm.value.email + '@gmail.com';
  //     console.log('onsubmit:',this.signupForm.value);
  //     this.formSubmit.emit(this.signupForm.value)
  //   }
  // }
}
