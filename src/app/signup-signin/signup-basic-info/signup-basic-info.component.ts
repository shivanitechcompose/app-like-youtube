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

  months = [
    { value: 0, viewValue: 'January' },
    { value: 1, viewValue: 'February' },
    { value: 2, viewValue: 'March' },
    { value: 3, viewValue: 'April' },
    { value: 4, viewValue: 'May' },
    { value: 5, viewValue: 'June' },
    { value: 6, viewValue: 'July' },
    { value: 7, viewValue: 'August' },
    { value: 8, viewValue: 'September' },
    { value: 9, viewValue: 'October' },
    { value: 10, viewValue: 'November' },
    { value: 11, viewValue: 'December' },
  ];

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  public goToUseCreateEmail(): void {

    if(this.signupForm.get('dateOfBirthDay')?.valid &&
      this.signupForm.get('dateOfBirthMonth')?.valid &&
      this.signupForm.get('dateOfBirthYear')?.valid) {

      const month = this.signupForm.get('dateOfBirthMonth')?.value + 1;
      const dob = this.signupForm.get('dateOfBirthYear')?.value + '-' + month + '-' + this.signupForm.get('dateOfBirthDay')?.value;

      this.signupForm.patchValue({
        dateOfBirthMonth: month,
        dateOfBirth: dob
     });

      const userData = {
        signupType: 'createEmail',
        mainHeader1: 'How you’ll sign in',
        subTitle: 'Create a Gmail address for signing in to your Google Account'
      }
      this.emitMainHeader.emit(userData);
      console.log("signupForm", this.signupForm?.value);
    }
  }
}
