import { GridLoaderComponent } from '@Components/Loader/grid-loader/grid-loader.component';
import { API_URL } from '@Constants/index';
import { ApiService } from '@Services/api.service';
import { AsyncHandlerService } from '@Services/async-handler.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { themeBalham } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-repo-issues',
  imports: [GridLoaderComponent, AgGridAngular, NgIf, NgFor],
  templateUrl: './repo-issues.component.html',
  styleUrl: './repo-issues.component.css',
})
export class RepoIssuesComponent {
  @Input() data: any = {};
  loading: boolean = false;
  totalRecords = 0;
  totalPages = 3;
  theme = themeBalham;
  columns: ColDef[] = [];
  rowData = [];
  currentPage = 1;
  pageSize = 10;

  constructor(
    private api: ApiService,
    private asyncHanler: AsyncHandlerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.data?.data?.length) {
      const { data, totalPages, totalRecords, currentPage } = this.data;
      this.totalRecords = totalRecords;
      this.totalPages = totalPages;
      this.currentPage = currentPage;
      this.generateGrid(data);
    }
  }

  generateGrid(data: any) {
    this.columns = Object.keys(data[0]).map((key: string) => {
      return {
        field: key,
        filter: true,
        sortable: true,
      };
    });

    this.rowData = data;
  }

  getVisiblePages(): number[] {
    const visiblePages = [];
    const range = 1; // How many pages to show around current
    for (
      let i = Math.max(1, this.currentPage - range);
      i <= Math.min(this.totalPages - 1, this.currentPage + range);
      i++
    ) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.loadIssuesData();
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadIssuesData();
    }
  }

  loadIssuesData() {
    this.loading = true;
    this.asyncHanler.handleObservable(
      this.api.getData(
        `${API_URL.repoIssuesData}/${this.route.snapshot.paramMap.get(
          'repoId'
        )}?page=${this.currentPage}&limit=${this.pageSize}`
      ),
      (res: any) => {
        const { totalPages, flateData } = res.data;
        this.totalPages = totalPages;
        this.generateGrid(flateData);
      },
      () => {
        this.loading = false;
      }
    );
  }
}
