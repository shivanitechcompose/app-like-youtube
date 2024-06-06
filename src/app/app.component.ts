import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YoutubeService } from './shared/services/youtube.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SearchContainerComponent, MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'app-like-youtube';
  public ifSignin: boolean = false;

  events: string[] = [];
  opened: boolean = false;

  shorts: any[] = [];

  private accessToken: any = localStorage.getItem('access-token');

  constructor(private youtubeService: YoutubeService) {}


  ngOnInit() {
    this.ifSignin = localStorage.getItem('signinClicked') === 'true';
  }

  openHistory() {
    this.getYouTubeShorts();
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
}
