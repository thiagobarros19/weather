import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private iconUrl = 'https://openweathermap.org/img/w';
  private flagUrl = 'http://openweathermap.org/images/flags';

  private appId = '76d1b43ba3695cfae59aa9f7dc9b4877';

  constructor() { }

  public getUrl(type: 'API' | 'ICON' | 'FLAG'): string {
    switch (type) {
      case 'API':
        return this.apiUrl;
      case 'ICON':
        return this.iconUrl;
      case 'FLAG':
        return this.flagUrl;
    }
  }

  public getAppId(): string {
    return this.appId;
  }
}
