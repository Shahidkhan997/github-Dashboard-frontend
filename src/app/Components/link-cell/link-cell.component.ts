import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-link-cell',
  imports: [RouterLink],
  templateUrl: './link-cell.component.html',
  styleUrl: './link-cell.component.css',
})
export class LinkCellComponent implements ICellRendererAngularComp {
  url!: string;
  displayText!: string;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.url = `/repo/detail/${params.value}`;
    this.displayText = params.value;
  }

  refresh(_params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
