import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastserviceService {
  constructor(private toastr: ToastrService) {}

  successMessage(message: string) {
    this.toastr.success(message, '', {
      closeButton: true,
    });
  }

  errorMessage(message: string) {
    this.toastr.error(message, '', {
      closeButton: true,
    });
  }
}
