import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { HttpClientModule } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { UserSignupSigninService } from '../../services/user-signup-signin.service';
import { EmailExistsValidator } from '../../validators/emailExist.validator';
@Component({
  selector: 'app-user-signup',
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
    SignupPasswordComponent,
    HttpClientModule
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent implements OnInit {

  // @Output() formSubmit = new EventEmitter<FormGroup>();

  public mainHeader1: string = 'Create a Google';
  public mainHeader2: string = 'Account';
  public subTitle: string = 'Enter your name';
  public signupType: string = 'name';

  public signupForm: FormGroup = this.fb.group({});
  emailPattern = '^[a-zA-Z0-9.]+$';

  constructor(private fb: FormBuilder, private router: Router, private userSignupSigninService: UserSignupSigninService,
    private emailExistsValidator: EmailExistsValidator) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      surname: [''],
      email: ['', {
        validators: [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9.]+$"),
          Validators.minLength(6),
          Validators.maxLength(30)
        ],
        asyncValidators: [this.emailExistsValidator.emailTakenValidator()],
        updateOn: 'blur'
      }],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[a-z0-9$@$!%*?&]{8,}')]],
      confirmPassword: ['', [Validators.required]],
      dateOfBirthDay: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dateOfBirthMonth: ['', [Validators.required]],
      dateOfBirthYear: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dateOfBirth: ['']
    }, { validators: this.dateOfBirthValidator });
  }

  getData(event: any) {
    this.mainHeader1 = event?.mainHeader1;
    this.mainHeader2 = event?.mainHeader2;
    this.subTitle = event?.subTitle;
    this.signupType = event?.signupType;
  }

  dateOfBirthValidator(formGroup: FormGroup) {
    const day = formGroup.get('dateOfBirthDay')?.value;
    const month = formGroup.get('dateOfBirthMonth')?.value;
    const year = formGroup.get('dateOfBirthYear')?.value;

    if (day && month !== null && year) {
      const date = new Date(year, month, day);
      const today = new Date();
      if (date > today) {
        return { dateOfBirthFuture: true };
      }
      if (month == 1 && day > 28) { // February
        if (!((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) && day > 28) {
          return { invalidDate: true }; // Not a leap year
        }
        if (day > 29) {
          return { invalidDate: true };
        }
      }
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      if (day > daysInMonth) {
        return { invalidDate: true };
      }
    }
    return null;
  }
}
