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
import { UserSignupComponent } from '../../shared/components/user-signup/user-signup.component';

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
    UserSignupComponent],
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
    'Other'
  ];

  // referGender: string[] = [
  //   'Female',
  //   'Male',
  //   'Other'
  // ];

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
  customisedGender: boolean = false;

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  public goToUseCreateEmail(): void {
    const day = this.signupForm.get('dateOfBirthDay')?.value;
    const month = this.signupForm.get('dateOfBirthMonth')?.value;
    const year = this.signupForm.get('dateOfBirthYear')?.value;

    if (!day || !month || !year || this.signupForm.get('dateOfBirthDay')?.hasError('pattern')
     || this.signupForm.get('dateOfBirthYear')?.hasError('pattern')) {
      this.dateOfBirthIncomplete = true;
    }

    const enteredDate = year + '-' + month + '-' + day;
    const today = new Date();
    today.setHours(0,0,0,0);
    const givenEnteredDate = new Date(enteredDate);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = givenEnteredDate.getDate() === yesterday.getDate() &&
    givenEnteredDate.getMonth() === yesterday.getMonth() &&
    givenEnteredDate.getFullYear() === yesterday.getFullYear();

    if(givenEnteredDate.toDateString() === today.toDateString() || isYesterday || givenEnteredDate > today) {
      this.dateOfBirthIncomplete = true;
    }

    if (
      !this.signupForm.get('dateOfBirthDay')?.hasError('required') &&
      !this.signupForm.get('dateOfBirthMonth')?.hasError('required') &&
      !this.signupForm.get('dateOfBirthYear')?.hasError('required') &&
      !this.signupForm.get('dateOfBirthYear')?.hasError('pattern') &&
      !this.dateOfBirthIncomplete
    ) {
      const userData = {
        signupType: 'createEmail',
        mainHeader1: 'How you’ll sign in',
        subTitle: 'Create a Gmail address for signing in to your Google Account'
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

    if (!day || !month || !year || this.signupForm.get('dateOfBirthDay')?.hasError('pattern')
    || this.signupForm.get('dateOfBirthYear')?.hasError('pattern')) {
      this.dateOfBirthIncomplete = true;
    }
  }

  checkGender(event: any) {
    console.log("hey", event, 'form:',this.signupForm.get('gender')?.value)
    // if(event.value === 'Costomised') {
    //   this.customisedGender = true;
    // }
  }
}
