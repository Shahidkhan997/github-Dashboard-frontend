import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarServiceService {
  private sidebarOpen$ = new BehaviorSubject<boolean>(true);

  getSidebarStatus() {
    return this.sidebarOpen$.asObservable();
  }

  toggleSidebar() {
    this.sidebarOpen$.next(!this.sidebarOpen$.value);
  }
}
