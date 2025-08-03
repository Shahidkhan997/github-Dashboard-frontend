import { NgFor, NgIf } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-object-view',
  imports: [NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul [style.paddingLeft.px]="depth * 16" class="object-view-list">
      <li *ngFor="let item of objectEntries" class="object-view-item">
        <strong [class.parent-key]="isObject(item.value)"
          >{{ item.key }}:</strong
        >
        <span *ngIf="!isObject(item.value)" class="leaf-value">{{
          item.value
        }}</span>
        <app-object-view
          *ngIf="isObject(item.value)"
          [data]="item.value"
          [depth]="depth + 1"
        ></app-object-view>
      </li>
    </ul>
  `,
  styles: [
    `
      .object-view-list {
        list-style-type: none;
        margin: 0;
        padding-left: 0;
        font-family: monospace;
        font-size: 14px;
      }
      .object-view-item {
        margin-bottom: 4px;
      }
      .parent-key {
        color: #007acc;
        cursor: default;
      }
      .leaf-value {
        margin-left: 6px;
      }
    `,
  ],
})
export class ObjectViewComponent {
  @Input() data!: any;
  @Input() depth = 0; // default root level = 0

  get objectEntries() {
    return this.data && typeof this.data === 'object'
      ? Object.entries(this.data).map(([k, v]) => ({ key: k, value: v }))
      : [];
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object';
  }
}
