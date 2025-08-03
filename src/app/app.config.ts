import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  apiInterceptor,
  refreshTokenInterceptor,
} from '@Interceptors/api.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideHttpClient(
      withInterceptors([apiInterceptor, refreshTokenInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
