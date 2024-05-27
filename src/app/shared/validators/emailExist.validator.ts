import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserSignupSigninService } from '../services/user-signup-signin.service';

@Injectable({ providedIn: 'root' })
export class EmailExistsValidator {
  constructor(private userSignupSigninService: UserSignupSigninService) {}

  emailTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value?.includes('@gmail.com') ? control.value : control.value + '@gmail.com';
      return this.userSignupSigninService.userEmailPresent(email).pipe(
        map((res: any) => {
          return res['data']['email_already_exist'] ? { emailTaken: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  userNotFoundValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userSignupSigninService.userEmailPresent(control.value).pipe(
        map((res: any) => {
          return res['data']['email_already_exist'] ? null : { userNotFound: true };
        }),
        catchError(() => of(null))
      );
    };
  }
}
