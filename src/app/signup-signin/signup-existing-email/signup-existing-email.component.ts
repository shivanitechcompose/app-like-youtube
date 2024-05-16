import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserSignupSigninComponent } from '../../shared/components/user-signup-signin/user-signup-signin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-existing-email',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSignupSigninComponent],
  templateUrl: './signup-existing-email.component.html',
  styleUrl: './signup-existing-email.component.scss'
})
export class SignupExistingEmailComponent {

  @Input() public signupForm : FormGroup = this.fb.group({})

  @Output() public emitMainHeader: EventEmitter<Object> = new EventEmitter();
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  onFormSubmit(event: any) {
    console.log('step1:', event);
  }

  public goToNext(): void {
      // const userData = {
      //   signupType: 'basicInfo',
      //   mainHeader1: 'Basic Information',
      //   subTitle: 'Enter your birthday and gender'
      // }

      // this.emitMainHeader.emit(userData);
      console.log("signupForm", this.signupForm?.value);
  }
}
