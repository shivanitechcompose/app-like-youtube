import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyDhxtUjIfS_iCEhLacCRA50ZjoV9c5qj_c';

  constructor(private http: HttpClient) { }

  getVideosFromSearchResult(query: string, regionCode: string, language: string): Observable <any> {
    const url = `${this.apiUrl}/search?q=${query}&key=${this.apiKey}&part=snippet&type=video&regionCode=${regionCode}&relevanceLanguage=${language}&maxResults=12`;
    console.log('in search videos')
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
  }

  getVideos(regionCode: string, language: string): Observable <any> {
    const url = `${this.apiUrl}/videos?part=snippet&chart=mostPopular&regionCode=${regionCode}&relevanceLanguage=${language}&maxResults=24&key=${this.apiKey}`;
    console.log('in videos')
    return this.http.get(url)
      .pipe(
        map((response: any) => response.items)
      );
  }

  searchShorts(query: string, regionCode: string, language: string): Observable<any> {
    const params = {
      key: this.apiKey,
      q: query,
      part: 'snippet',
      type: 'video',
      maxResults: '10',
      videoDuration: 'short', // This ensures the video is less than 60 seconds
    };

    return this.http.get(`${this.apiUrl}/search?regionCode=${regionCode}&relevanceLanguage=${language}`, { params });
  }

  getLanguages(): Observable<any> {
    const url = `${this.apiUrl}/i18nLanguages?part=snippet&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
