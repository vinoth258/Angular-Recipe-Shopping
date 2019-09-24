import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private authSub : Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.onLogout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
