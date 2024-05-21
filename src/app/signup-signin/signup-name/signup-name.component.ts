import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserSignupComponent } from '../../shared/components/user-signup/user-signup.component';

@Component({
  selector: 'app-signup-name',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    UserSignupComponent],
  templateUrl: './signup-name.component.html',
  styleUrl: './signup-name.component.scss'
})
export class SignupNameComponent implements OnInit {
  @Input() public signupForm : FormGroup = this.fb.group({})
  @Output() public emitMainHeader: EventEmitter<Object> = new EventEmitter();

  nameIncomplete: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log("signupForm", this.signupForm?.value)
  }

  public goToBasicInfo(): void {
    const name = this.signupForm.get('firstName')?.value;

    if(!name) {
      this.nameIncomplete = true;
    }
    
    if (this.signupForm?.value?.firstName !== '') {
      const userData = {
        signupType: 'basicInfo',
        mainHeader1: 'Basic Information',
        subTitle: 'Enter your birthday and gender'
      }

      this.emitMainHeader.emit(userData);
      console.log("signupForm", this.signupForm?.value);
    }
  }

  checkValues(): void {
    this.nameIncomplete = false;
    const name = this.signupForm.get('firstName')?.value;

    if(!name) {
      this.nameIncomplete = true;
    }
  }

}
