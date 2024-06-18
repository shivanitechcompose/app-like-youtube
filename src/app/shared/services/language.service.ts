import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private selectedLanguageSource = new BehaviorSubject<string>('en-US');
  selectedLanguage$ = this.selectedLanguageSource.asObservable();

  constructor() { }

  setSelectedLanguage(language: string) {
    this.selectedLanguageSource.next(language);
  }
}
