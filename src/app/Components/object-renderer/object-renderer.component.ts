import { NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';
import { ObjectViewComponent } from '../object-view/object-view.component';

@Component({
  selector: 'app-object-renderer',
  standalone: true,
  imports: [NgIf, ObjectViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './object-renderer.component.html',
  styleUrl: './object-renderer.component.css',
})
export class ObjectRendererComponent implements ICellRendererAngularComp {
  isVisible = false;
  objectEntries: { key: string; value: any }[] = [];
  @Input() data!: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.data = params.value;
    this.objectEntries = this.convertObjectToEntries(this.data);
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.data = params.value;
    this.objectEntries = this.convertObjectToEntries(this.data);
    return true;
  }

  hanldeExpandRow() {
    this.isVisible = !this.isVisible;
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object';
  }

  private convertObjectToEntries(value: any): { key: string; value: any }[] {
    return value && typeof value === 'object'
      ? Object.entries(value).map(([k, v]) => ({ key: k, value: v }))
      : [];
  }
}
