import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Video } from '../shared/models/youtube.interface';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent {
  @Input() videos!: Video[];

  public isLoggedIn: boolean = false;
  isSearching: boolean = false;

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isSearching = localStorage.getItem('isSearching') === 'true';
  }
}
