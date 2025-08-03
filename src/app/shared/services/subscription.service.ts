import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private VAPID_PUBLIC_KEY =
    'BCjPBef5PWX3TPyhAy41eWcD_EL_bsEqNqGfjoUrDWGoHzvjSRAMSKT-6pPbPZbr0erGL-6qGi1kJZItDk6S8t0';

  constructor() {}

  async subscribeUser(): Promise<PushSubscription | null> {
    // Check if the environment supports Push
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications are not supported in this browser.');
      return null;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Push permission was not granted.');
      return null;
    }

    // Get Service Worker Registration
    const reg = await navigator.serviceWorker.ready;

    try {
      // Attempt to subscribe
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
      });

      return subscription;
    } catch (error) {
      console.error('Subscription failed', error);
      return null;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    console.log('Helloooooo 6');

    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/\_/g, '/');
    const rawData = window.atob(base64);
    const output = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      output[i] = rawData.charCodeAt(i);
    }
    return output;
  }
}
