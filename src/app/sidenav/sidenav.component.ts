import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../shared/services/youtube.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  languages: any[] = [];
  selectedLanguage: string = 'en-US';

  @Output() languageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private youtubeService: YoutubeService, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.youtubeService.getLanguages().subscribe((response: any) => {
      console.log('response?.item?.length:', response?.items?.length)
      for(let i=0; i <= response?.items?.length; i++) {
        if(response?.items[i]?.snippet?.hl?.length > 2) {
          this.languages.push(response?.items[i]);
        }
      }
      this.cd.detectChanges();
    });
  }

  changeLanguage(language: any): void {
    console.log('lang:', language)
    this.selectedLanguage = language['target']['value'];
    this.languageChanged.emit(this.selectedLanguage);
  }

}
