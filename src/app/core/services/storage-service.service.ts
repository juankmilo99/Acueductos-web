import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private cart: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentCart = this.cart.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const cartValue = typeof localStorage !== 'undefined' ? localStorage.getItem('cart') : null;
      if (cartValue !== null) {
        this.cart.next(+cartValue);
      }
    }
  }

  setItem(key: string, data: any): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  updateCart(orderId: number): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', orderId.toString());
      this.cart.next(orderId);
    }
  }
}