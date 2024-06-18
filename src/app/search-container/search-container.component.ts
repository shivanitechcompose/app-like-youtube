import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SearchListComponent } from '../search-list/search-list.component';
import { Video } from '../shared/models/youtube.interface';
import { LanguageService } from '../shared/services/language.service';
import { YoutubeService } from '../shared/services/youtube.service';
import { ShortsComponent } from '../shorts/shorts.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [CommonModule, SearchListComponent, DashboardComponent, HttpClientModule, SidenavComponent, ShortsComponent],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss'
})
export class SearchContainerComponent implements OnInit, OnChanges, OnDestroy {

  inputTouched = false;
  loading = false;
  language!: string;
  videos: any[] = [];
  lang!: string;
  regionCode!: string;

  private subscription!: Subscription;

  constructor(private youtubeService: YoutubeService, private languageService: LanguageService) { }

  ngOnInit() {
    this.subscription = this.languageService.selectedLanguage$.subscribe(language => {
      this.language = language;
      this.getMostPopuplarVideos();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] && !changes['language'].firstChange) {
      this.getMostPopuplarVideos();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMostPopuplarVideos() {
    this.lang = this.language.split('-')?.[0];
    this.regionCode = this.language.split('-')?.[1];
    this.youtubeService.getVideos(this.regionCode ? this.regionCode : 'US', this.lang ? this.lang : 'en').subscribe((response: any) => {
      this.videos = response.map((item: any) => {
        return {
          title: item.snippet.title,
          videoId: item.id.videoId,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId ? item.id.videoId : item.id}`,
          channelId: item.snippet.channelId,
          channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
          channelTitle: item.snippet.channelTitle,
          description: item.snippet.description,
          publishedAt: new Date(item.snippet.publishedAt),
          thumbnail: item.snippet.thumbnails.high.url
        };
      });
    });
  }

  handleSearch(inputValue: string) {
    this.loading = true;
    if(inputValue !== '') {
    localStorage.setItem('isSearching', 'true');
    this.youtubeService.getVideosFromSearchResult(inputValue, this.regionCode ?  this.regionCode : 'US', this.lang ? this.lang : 'en')
      .subscribe((data: any) => {
        console.log('data:', data)
        this.videos = data.map((item: any) => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          };
        });
        console.log('handle search')
        this.inputTouched = true;
        this.loading = false;
      });
    } else {
      localStorage.setItem('isSearching', 'false');
      this.getMostPopuplarVideos();
    }
  }
}
