import { Component, signal } from '@angular/core';
import { PageTitleComponent } from '@Components/page-title/page-title.component';
import { MatCard } from '@angular/material/card';
import { ProfileRowComponent } from '@Components/profile-row/profile-row.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { LocalStorageService } from '@Services/local-storage.service';
import { API_URL, ENUMS } from '@Constants/index';
import { NgIf } from '@angular/common';
import { ApiService } from '@Services/api.service';
import { AsyncHandlerService } from '@Services/async-handler.service';
import { ToastserviceService } from '@Services/toastservice.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmRemoveGithubModalComponent } from '@Components/confirm-remove-github-modal/confirm-remove-github-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PageTitleComponent,
    MatCard,
    ProfileRowComponent,
    MatExpansionModule,
    MatIcon,
    MatButton,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  readonly panelOpenState = signal(true);
  userData: any = {};
  loading: boolean = false;

  constructor(
    private localStorage: LocalStorageService,
    private api: ApiService,
    private asyncHandler: AsyncHandlerService,
    private dialog: MatDialog,
    private toast: ToastserviceService
  ) {}

  ngOnInit() {
    const userFromCookie = this.getCookie('user');
    if (userFromCookie) {
      this.localStorage.setData(ENUMS.userData, userFromCookie);
    }
    this.userData = this.localStorage.getData(ENUMS.userData);
  }

  getCookie(name: string): any {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((c) => c.startsWith(name + '='));
    if (cookie) {
      const value = cookie.split('=')[1];
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  onGithubConnect() {
    this.loading = true;
    this.asyncHandler.handleObservable(
      this.api.getData(API_URL.githubConnect),
      (data: any) => {
        window.location.href = data?.data.redirectUrl;
      }
    );
  }

  onRemoveClick() {
    const dialogRef = this.dialog.open(ConfirmRemoveGithubModalComponent, {
      width: '400px',
      disableClose: true,
    });

    const componentInstance = dialogRef.componentInstance;

    componentInstance.onConfirm.subscribe(() => {
      componentInstance.loading = true;

      this.asyncHandler.handleObservable(
        this.api.deleteData(`${API_URL.githubRemove}`),
        (res: any) => {
          this.toast.successMessage(
            res?.message || 'Github data deleted successfully'
          );
          const userData = this.localStorage.getData(ENUMS.userData);
          userData.github = null;
          this.localStorage.setData(ENUMS.userData, userData);
          dialogRef.close();
        }
      );
    });

    componentInstance.onClose.subscribe(() => {
      dialogRef.close();
    });
  }
}
