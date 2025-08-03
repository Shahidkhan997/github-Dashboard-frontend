import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardTitle } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() linkText: string = '';
  @Input() linkUrl: string = '';
  @Input() linkQuestion: string = '';
  @Input() loading: boolean = false;
  @Input() formGroup!: FormGroup;
  @Output() onSubmit = new EventEmitter<void>();
}
