import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatterService {
  public getFormat(): string {
    return "DD-MM-YYYY"; // add you own logic here
  }
  public getLocale(): string {
    return "en-US"; // add you own logic here
  }
}
