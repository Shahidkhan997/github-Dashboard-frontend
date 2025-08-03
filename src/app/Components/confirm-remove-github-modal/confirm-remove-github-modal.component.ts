import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-confirm-remove-github-modal',
  imports: [MatButtonModule, MatDialogModule, MatProgressSpinnerModule, NgIf],
  template: `
    <h2 mat-dialog-title>Remove GitHub Token</h2>
    <mat-dialog-content>
      <p>
        Do you want to remove your GitHub token? This will delete all your
        synced data with the application.
      </p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <ng-container *ngIf="!loading; else loadingTpl">
        <button mat-button (click)="onClose.emit()">Close</button>
        <button mat-flat-button color="warn" (click)="onConfirm.emit()">
          Confirm
        </button>
      </ng-container>
      <ng-template #loadingTpl>
        <div class="flex justify-center w-full bg-primary py-2 rounded-md">
          <mat-progress-spinner
            mode="indeterminate"
            diameter="24"
            color="accent"
            strokeWidth="3"
          >
          </mat-progress-spinner>
        </div>
      </ng-template>
    </mat-dialog-actions>
  `,
})
export class ConfirmRemoveGithubModalComponent {
  @Input() loading = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
}
