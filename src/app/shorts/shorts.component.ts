import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../shared/services/language.service';
import { YoutubePlayerService } from '../shared/services/youtube-player.service';
import { YoutubeService } from '../shared/services/youtube.service';

@Component({
  selector: 'app-shorts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shorts.component.html',
  styleUrl: './shorts.component.scss'
})
export class ShortsComponent {

  private subscription!: Subscription;
  loading: boolean = true;
  constructor(private youtubeService: YoutubeService, private youtubePlayerService: YoutubePlayerService, private languageService:LanguageService) {}

  shorts: any[] = [];

  ngOnInit() {
    let selectedLanguage = '';
    this.subscription = this.languageService.selectedLanguage$.subscribe(language => {
      selectedLanguage = language;
    });

    const lang = selectedLanguage.split('-')?.[0];
    const regionCode = selectedLanguage.split('-')?.[1];

    const query = 'shorts'; // You can modify this to search for specific shorts
    this.youtubeService.searchShorts(query, regionCode, lang).subscribe(
      (response: any) => {
        this.shorts = response.items;
        console.log(this.shorts);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching YouTube Shorts:', error);
      }
    );
  }

  playShort(videoId: string): void {
    this.youtubePlayerService.playVideo(videoId);
  }

}
