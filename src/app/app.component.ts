import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YoutubeService } from './shared/services/youtube.service';
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SearchContainerComponent, MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges{
  title = 'app-like-youtube';
  public ifSignin: boolean = false;

  events: string[] = [];
  opened: boolean = false;

  shorts: any[] = [];
  selectedLanguage: string = '';

  private accessToken: any = localStorage.getItem('access-token');

  constructor(private youtubeService: YoutubeService,
    private youtubePlayerService: YoutubePlayerService) {}


  ngOnInit() {
    this.ifSignin = localStorage.getItem('signinClicked') === 'true';
  }

  ngOnChanges() {
    console.log('sele::::', this.selectedLanguage)
  }

  openHistory() {
    this.getYouTubeShorts();
  }

  onLanguageChanged(language: string): void {
    this.selectedLanguage = language;
    console.log('selected:', this.selectedLanguage)
  }

  getYouTubeShorts(): void {
    const query = 'shorts'; // You can modify this to search for specific shorts
    this.youtubeService.searchShorts(query).subscribe(
      (response: any) => {
        this.shorts = response.items;
        console.log(this.shorts);
      },
      (error) => {
        console.error('Error fetching YouTube Shorts:', error);
      }
    );
  }

  playShort(videoId: string): void {
    this.youtubePlayerService.playVideo(videoId);
  }

  getPageRefresh() {
    window.location.reload();
  }
}
