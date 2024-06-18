import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { YoutubeService } from '../shared/services/youtube.service';
import { LanguageService } from '../shared/services/language.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  languages = [
    { id: 'en-US', snippet: { name: 'English' } },
    { id: 'es-ES', snippet: { name: 'Spanish' } }
  ];

  selectedLanguage: string = this.languages[0].id;

  events: string[] = [];
  opened: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;


  @Output() languageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private youtubeService: YoutubeService, private cd:ChangeDetectorRef, private router: Router, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.youtubeService.getLanguages().subscribe((response: any) => {
      console.log('response?.item?.length:', response?.items?.length)
      // this.languages = response?.items;
      for(let i=0; i <= response?.items?.length; i++) {
        if(response?.items[i]?.snippet?.hl?.length > 2) {
          this.languages.push(response?.items[i]);
        }
      }
      this.cd.detectChanges();
    });
  }


  toggleSidenav() {
    this.sidenav.toggle();
  }

  changeLanguage(event: any): void {
    const selectedLang = event.target.value;
    this.selectedLanguage = selectedLang;
    this.languageService.setSelectedLanguage(selectedLang);
  }

  openShorts() {
    this.router.navigate(['/shorts']);
  }

  getPageRefresh() {
    this.router.navigate(['/search-landing']);
  }

}
