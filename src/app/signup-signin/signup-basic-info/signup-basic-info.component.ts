import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserSignupSigninComponent } from '../../shared/components/user-signup-signin/user-signup-signin.component';

@Component({
  selector: 'app-signup-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    UserSignupSigninComponent],
  templateUrl: './signup-basic-info.component.html',
  styleUrl: './signup-basic-info.component.scss'
})
export class SignupBasicInfoComponent implements OnInit {

  @Input() public signupForm : FormGroup = this.fb.group({})

  @Output() public emitMainHeader: EventEmitter<Object> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) {}

  availableGender: string[] = [
    'Female',
    'Male',
    'Rather not say',
    'Costomised'
  ];

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  dateOfBirthIncomplete: boolean = false;


  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  onFormSubmit(event: any) {
    console.log('step1:', event);
  }

  public goToUseExistingEmail(): void {
    const day = this.signupForm.get('dateOfBirthDay')?.value;
    const month = this.signupForm.get('dateOfBirthMonth')?.value;
    const year = this.signupForm.get('dateOfBirthYear')?.value;

    if (!day || !month || !year) {
      this.dateOfBirthIncomplete = true;
    }

    if (this.signupForm?.value?.dateOfBirthDay !== '' &&
    this.signupForm?.value?.dateOfBirthMonth !== '' &&
    this.signupForm?.value?.dateOfBirthYear !== '' &&
    this.signupForm?.value?.gender !== '') {
      const userData = {
        signupType: 'existingEmail',
        mainHeader1: 'Use your existing email',
        subTitle: 'Enter the email address that you want to use for your Google Account'
      }

      this.emitMainHeader.emit(userData);
      console.log("signupForm", this.signupForm?.value)
    }
  }


  checkValues(): void {
    this.dateOfBirthIncomplete = false;
    const day = this.signupForm.get('dateOfBirthDay')?.value;
    const month = this.signupForm.get('dateOfBirthMonth')?.value;
    const year = this.signupForm.get('dateOfBirthYear')?.value;

    if (!day || !month || !year) {
      this.dateOfBirthIncomplete = true;
    }
  }
}
