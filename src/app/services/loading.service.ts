import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  on() {
    this.isLoading = true;
  }

  off() {
    this.isLoading = false;
  }
}
