import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import { UserSignupSigninService } from '../shared/services/user-signup-signin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('input') inputElement!: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private userSignupSigninService: UserSignupSigninService) {}

  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value') as any, // Type assertion to avoid TypeScript errors
        distinctUntilChanged<string>(),
        // filter((value: string) => value.length > 2),
        map((value: string) => value)
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }
}
