import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, take } from 'rxjs/operators';
import { ConsolidatedWeather, Location, Weather } from './weather.service.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  locationURL = environment.api.locationURL;
  woeidURL = environment.api.woeidURL;
  imgURL = environment.api.imgURL;

  constructor(private http: HttpClient) { }

  getWeather(latt: number, long: number): any {
    return this.http.get(`${this.locationURL}?lattlong=${latt},${long}`)
      .pipe(
        take(1),
        map((location: Location) => location[0].woeid),
        switchMap(woeid => this.http.get(`${this.woeidURL}${woeid}`)),
        map((weather: Weather) => {
          return weather.consolidated_weather[0];
        }),
      );
  }

  async getImage(data: ConsolidatedWeather): Promise<string> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    return await this.http.get(`${this.imgURL}${data.weather_state_abbr}.svg`, { headers, responseType: 'text' }).toPromise();
  }
}
