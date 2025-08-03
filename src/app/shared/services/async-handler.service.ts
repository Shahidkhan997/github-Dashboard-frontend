import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastserviceService } from '@Services/toastservice.service';

@Injectable({ providedIn: 'root' })
export class AsyncHandlerService {
  constructor(private toast: ToastserviceService) {}

  handleObservable<T>(
    obs$: Observable<T>,
    onSuccess?: (data: T) => void,
    onFinally?: () => void
  ): void {
    obs$.subscribe({
      next: (data) => {
        console.log('Response ==>', data);
        if (onSuccess) onSuccess(data);
      },
      error: (error) => {
        console.log('Error ==>', error);
        const errorMsg =
          error?.error?.message ||
          error?.response?.data?.message ||
          error.message ||
          'Something went wrong';
        this.toast.errorMessage(errorMsg);
        onFinally?.();
      },
      complete: () => {
        if (onFinally) onFinally();
      },
    });
  }
}
