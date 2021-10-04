import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { WeatherService } from '../../services/weather.service';

import { ICity, ICoord, IListCity } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public preloader: boolean;

  public faCoffee = faSearch;

  public cityInput: string;
  public cityList: IListCity;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.preloader = false;
    this.cityInput = '';
    this.cityList = {
      cod: '',
      count: 0,
      list: [],
      message: ''
    };
  }

  async ngAfterViewInit(): Promise<void> {
    const {q} = this.getQueryParams();
    if (q) {
      this.cityInput = q;
      this.search();
    }

    const {latitude: lat, longitude: lon} = await this.getGeoLocation();
    this.getListCityByCoords({lat, lon});
  }

  private getGeoLocation(): Promise<any> {
    return new Promise( resolve => {
      navigator.geolocation.getCurrentPosition(geolocation => {
        resolve(geolocation.coords);
      });
    });
  }

  private getQueryParams() {
    return this.route.snapshot.queryParams;
  }

  public navigate(id: number): void {
    this.router.navigate([`details/${id}`]);
  }

  public submit(e: Event): void {
    e.preventDefault();
    this.search();
  }

  public search(): void {
    this.getListCity(this.cityInput);
  }

  public async getListCity(cityName: string): Promise<void> {
    this.preloader = true;
    await this.weatherService.getListCity(cityName)
    .subscribe(
      (res: IListCity) => {
        this.preloader = false;
        this.cityList = res;
        console.log(this.cityList);
      },
      err => {
        this.preloader = false;
        console.log(err);
      }
    );
  }

  public async getListCityByCoords(coord: ICoord): Promise<void> {
    this.preloader = true;
    await this.weatherService.getListCityByCoords(coord)
    .subscribe(
      (res: ICity) => {
        this.preloader = false;
        this.cityInput = res.name;
        this.search();
      },
      err => {
        this.preloader = false;
        console.log(err);
      }
    );
  }

}
