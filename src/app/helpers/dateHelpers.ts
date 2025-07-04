import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelpers {
  public static getCurrentTimeString(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
