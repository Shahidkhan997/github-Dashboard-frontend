import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-profile-row',
  imports: [MatDivider],
  templateUrl: './profile-row.component.html',
  styleUrl: './profile-row.component.css',
})
export class ProfileRowComponent {
  @Input() key: string = '';
  @Input() value: string = '';
}
