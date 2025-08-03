import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ENUMS } from '@Constants/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStroage: LocalStorageService) {}

  isLoggedIn(): any {
    const user = this.localStroage.getData(ENUMS.accessToken);
    return !!user;
  }
}
