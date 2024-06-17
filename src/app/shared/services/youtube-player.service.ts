import { Injectable } from '@angular/core';
declare var YT: any;

@Injectable({
  providedIn: 'root'
})
export class YoutubePlayerService {
  private player: any;

  constructor() {  this.loadYouTubeAPI();}


  loadYouTubeAPI(): void {
    if (!window['YT']) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window['onYouTubeIframeAPIReady'] = () => {
        console.log('YouTube IFrame API Ready');
      };  
    }
  }

  createPlayer(videoId: string, containerId: string): void {
    this.player = new YT.Player(containerId, {
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });
  }

  onPlayerReady(event: any): void {
    event.target.playVideo();
  }

  onPlayerStateChange(event: any): void {
    // Handle player state changes if needed
  }

  playVideo(videoId: string): void {
    if (this.player) {
      this.player.loadVideoById(videoId);
    } else {
      this.createPlayer(videoId, 'player-container');
    }
  }
}
