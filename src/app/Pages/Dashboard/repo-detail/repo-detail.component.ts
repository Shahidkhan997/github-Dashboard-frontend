import { GridLoaderComponent } from '@Components/Loader/grid-loader/grid-loader.component';
import { PageTitleComponent } from '@Components/page-title/page-title.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { NgIf } from '@angular/common';
import { themeBalham } from 'ag-grid-community';
import { RepoPullsComponent } from '@Components/repo-pulls/repo-pulls.component';
import { RepoCommitsComponent } from '@Components/repo-commits/repo-commits.component';
import { RepoIssuesComponent } from '@Components/repo-issues/repo-issues.component';
import { ApiService } from '@Services/api.service';
import { AsyncHandlerService } from '@Services/async-handler.service';
import { API_URL } from '@Constants/index';
import { ToastserviceService } from '@Services/toastservice.service';

@Component({
  selector: 'app-repo-detail',
  standalone: true,
  imports: [
    PageTitleComponent,
    GridLoaderComponent,
    AgGridAngular,
    NgIf,
    RepoPullsComponent,
    RepoCommitsComponent,
    RepoIssuesComponent,
  ],
  templateUrl: './repo-detail.component.html',
  styleUrl: './repo-detail.component.css',
})
export class RepoDetailComponent {
  theme = themeBalham;
  loading: boolean = false;
  repoRowData: any = [];
  repoCols: ColDef[] = [];
  pullData: any = null;
  commitData: any = null;
  issuesData: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private asyncHandler: AsyncHandlerService,
    private toast: ToastserviceService
  ) {}

  ngOnInit(): void {
    const repoId = this.route.snapshot.paramMap.get('repoId');
    if (repoId) {
      this.getRepoDetails(repoId);
    }
  }

  readyGridData(data: any) {
    this.repoCols = Object.keys(data).map((key: string) => {
      return {
        field: key,
        filter: true,
        sortable: true,
      };
    });

    this.repoRowData = [data];
  }

  getRepoDetails(repoId: string) {
    this.loading = true;
    this.asyncHandler.handleObservable(
      this.api.getData(`${API_URL.repodetail}/${repoId}`),
      (res: any) => {
        console.log(res.data);
        this.toast.successMessage(
          res?.message || 'Repo Detail fetched successfully'
        );
        this.readyGridData(res?.data?.repoData);
        this.pullData = res?.data?.pullRequests;
        this.commitData = res?.data?.commits;
        this.issuesData = res?.data?.issues;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
