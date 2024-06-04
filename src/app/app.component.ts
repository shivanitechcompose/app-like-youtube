import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SearchContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'app-like-youtube';
  public ifSignin: boolean = false;

  ngOnInit() {
    this.ifSignin = localStorage.getItem('signinClicked') === 'true';
  }
}
