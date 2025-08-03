import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  imports: [NgClass],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.css',
})
export class DashboardCardsComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() bgClass: string = 'from-gray-200 to-gray-400';
}
