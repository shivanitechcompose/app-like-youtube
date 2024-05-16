import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignupSigninComponent } from '../../../../shared/components/user-signup-signin/user-signup-signin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSignupSigninComponent],
  templateUrl: './signup-basic-info.component.html',
  styleUrl: './signup-basic-info.component.scss'
})
export class SignupBasicInfoComponent implements OnInit {

  @Input() public signupForm : FormGroup = this.fb.group({})

  @Output() public emitMainHeader: EventEmitter<Object> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  onFormSubmit(event: any) {
    console.log('step1:', event);
  }

  public goToUseExistingEmail(): void {
    if (this.signupForm?.value?.dateOfBirth !== '' &&  this.signupForm?.value?.gender !== '') {
      const userData = {
        signupType: 'email',
        mainHeader1: 'Use your existing email',
        subTitle: 'Enter the email address that you want to use for your Google Account'
      }

      this.emitMainHeader.emit(userData);
      console.log("signupForm", this.signupForm?.value)
    }
  }
}
