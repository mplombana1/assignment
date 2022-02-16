import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Coords } from './weather.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConsolidatedWeather } from '../services/weather.service.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  myWeather: ConsolidatedWeather;
  svg: SafeHtml;
  loading = false;

  constructor(private weatherService: WeatherService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    this.loading = true;
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        const userLocation = position.coords as Coords;
        this.getWeatherDynamic(userLocation);
      }
    }, (error) => {
      if (error) {
        this.getWeatherStatic(39.952271, -75.162369);
      }
    });
  }

  getWeatherDynamic(userLocation?: Coords): void {
    this.weatherService.getWeather(userLocation.latitude, userLocation.longitude)
      .subscribe((data: ConsolidatedWeather) => {
        this.myWeather = data;
        const p = this.weatherService.getImage(data);
        p.then((img) => {
          this.svg = this.sanitizer.bypassSecurityTrustHtml(img);
          this.loading = false;
        });
      });
  }

  getWeatherStatic(latt: number, long: number): void {
    this.weatherService.getWeather(latt, long)
      .subscribe((data: ConsolidatedWeather) => {
        this.myWeather = data;
        const p = this.weatherService.getImage(data);
        p.then((img) => {
          this.svg = this.sanitizer.bypassSecurityTrustHtml(img);
          this.loading = false;
        });
      });
  }
}
