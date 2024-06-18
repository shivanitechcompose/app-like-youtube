import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YoutubeService } from './shared/services/youtube.service';
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ShortsComponent } from './shorts/shorts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SearchContainerComponent, MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, SidenavComponent, ShortsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges{
  title = 'app-like-youtube';
  public ifSignin: boolean = false;

  events: string[] = [];
  opened: boolean = false;

  selectedLanguage: string = '';

  private accessToken: any = localStorage.getItem('access-token');

  constructor(private router: Router) {}


  ngOnInit() {
    this.ifSignin = localStorage.getItem('signinClicked') === 'true';
  }

  ngOnChanges() {
  }
  
  sidenavOpen() {
    this.router.navigate(['/sidenav'])
  }

  onLanguageChanged(language: string): void {
    this.selectedLanguage = language;
    console.log('selected:', this.selectedLanguage)
  }

}
