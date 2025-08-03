import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-grid-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './grid-loader.component.html',
  styleUrl: './grid-loader.component.css',
})
export class GridLoaderComponent {}
