import * as moment from 'moment';

export interface IListCity {
  cod: string | number;
  count: number;
  list: ICity[];
  message: string;
}

export interface IForecast {
  city: ICity;
  cnt: number;
  cod: string;
  list: ICity[];
  message: number | string;
}

export interface ICity {
  base?: string;
  clouds: {all: number};
  cod?: number;
  coord: ICoord;
  country?: string;
  dt: number;
  dt_txt?: string;
  dtString?: string | moment.Moment;
  timeString?: string | moment.Moment;
  id: number;
  main: IMain;
  pop?: number;
  name: string;
  population?: number;
  rain?: string;
  snow?: string;
  sys: ISys;
  sunrise?: number;
  sunset?: number;
  timezone?: number;
  visibility?: number;
  weather: IWeather[];
  wind: IWind;
}

export interface ISys {
  pod?: string;
  country: string;
  id?: number;
  sunrise?: number;
  sunriseString?: string | moment.Moment;
  sunset?: number;
  sunsetString?: string | moment.Moment;
  type?: number;
}

export interface ICoord {
  lat: number;
  lon: number;
}

export interface IMain {
  feels_like: number;
  grnd_level?: number;
  humidity: number;
  pressure: number;
  sea_level?: number;
  temp: number;
  temp_kf?: number;
  temp_max: number;
  temp_min: number;
}

export interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IWind {
  speed: number;
  deg: number;
  gust?: number;
}
