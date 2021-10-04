import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { ICity, ICoord, IForecast, IListCity } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  public getListCity(cityName: string): Observable<IListCity> {
    console.log(`${this.api.getUrl('API')}/find?q=${cityName}&appid=${this.api.getAppId()}&units=metric`);
    return this.http.get<IListCity>(
      `${this.api.getUrl('API')}/find?q=${cityName}&appid=${this.api.getAppId()}&units=metric`
    );
  }

  public getListCityByCoords({lat, lon}: ICoord): Observable<ICity> {
    return this.http.get<ICity>(
      `${this.api.getUrl('API')}/weather?lat=${lat}&lon=${lon}&appid=${this.api.getAppId()}&units=metric`
    );
  }

  public getWeatherById(id: number): Observable<ICity> {
    console.log(`${this.api.getUrl('API')}/weather?id=${id}&appid=${this.api.getAppId()}&units=metric`);
    return this.http.get<ICity>(
      `${this.api.getUrl('API')}/weather?id=${id}&appid=${this.api.getAppId()}&units=metric`
    );
  }

  public getForecastById(id: number): Observable<IForecast> {
    return this.http.get<IForecast>(
      `${this.api.getUrl('API')}/forecast?id=${id}&appid=${this.api.getAppId()}&units=metric`
    );
  }

}
