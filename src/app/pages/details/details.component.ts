import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ICity, IForecast } from 'src/app/interfaces/interface';

import { WeatherService } from '../../services/weather.service';
import { stringToDatetime, timestampToDatetime } from '../../functions/datetime';
import { ISys } from '../../interfaces/interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public preloader: boolean;

  public faCoffee = faSearch;
  public faArrowLeft = faArrowLeft;


  public cityInput: string;
  public cityWeather: ICity;
  public forecast: IForecast;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.preloader = false;
    this.cityWeather = this.initCityWeather();
    this.forecast = this.initForecast();
  }

  ngOnInit(): void {
    const { id } = this.getRouteParams();
    this.getWeatherById(id);
    this.getForecastById(id);
  }

  public submit(e: Event): void {
    e.preventDefault();
    this.search();
  }

  public search(): void {
    this.router.navigate(['search'], {queryParams: {q: this.cityInput}});
  }

  public getRouteParams(){
    return this.route.snapshot.params;
  }

  public routerBack(): void{
    this.router.navigate(['search']);
  }

  public async getWeatherById(id: number): Promise<void> {
    this.preloader = true;
    await this.weatherService.getWeatherById(id)
    .subscribe(
      res => {
        this.preloader = false;
        const sys: ISys = {
          ...res.sys,
          sunriseString: timestampToDatetime(res.sys.sunrise, 'HH:mm'),
          sunsetString: timestampToDatetime(res.sys.sunset, 'HH:mm')
        };

        this.cityWeather = {
          ...res,
          dtString: timestampToDatetime(res.dt, 'HH:mm MMM DD'),
          sys
        };

        console.log(this.cityWeather);

        this.cityInput = res.name;
      },
      err => {
        this.preloader = false;
        console.log(err);
      }
    );
  }

  public async getForecastById(id: number): Promise<void> {
    this.preloader = true;
    await this.weatherService.getForecastById(id)
    .subscribe(
      res => {
        this.preloader = false;
        const aux: ICity[] = [];
        res.list.map((city: ICity) => {
          aux.push({
            ...city,
            dtString: stringToDatetime(city.dt_txt, 'ddd DD MMM'),
            timeString: stringToDatetime(city.dt_txt, 'HH:MM')
          });
        });
        this.forecast = {
          ...res,
          list: aux
        };
      },
      err => {
        this.preloader = false;
        console.log(err);
      }
    );
  }

  private initCityWeather(): ICity {
    return {
      base: '',
      clouds: {all: 0},
      cod: 0,
      coord: {lat: 0, lon: 0},
      country: '',
      dt: 0,
      id: 0,
      main: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
      },
      name: '',
      population: 0,
      rain: '',
      snow: '',
      sys: {
        country: '',
        id: 0,
        sunrise: 0,
        sunset: 0,
        type: 0,
      },
      sunrise: 0,
      sunset: 0,
      timezone: 0,
      visibility: 0,
      weather: [
        {
          description: '',
          icon: '',
          id: 0,
          main: '',
        }
      ],
      wind: { speed: 0, deg: 0},
    };
  }

  private initForecast(): IForecast {
    return {
      city: this.initCityWeather(),
      cnt: 0,
      cod: '',
      message: 0,
      list: []
    };
  }

}
