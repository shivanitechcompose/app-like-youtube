import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Video } from '../shared/models/youtube.interface';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent {
  @Input() videos!: Video[];
}
