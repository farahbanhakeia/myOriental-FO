import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URL='http://api.openweathermap.org/data/2.5/weather?q=';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private readonly httpClientService: HttpClient) { }

   fetchData(cityName : string )
   {
    console.log();
    return this.httpClientService.get(
      `${URL}${cityName}&APPID=${environment.API_KEY}&units=metric`
    );
   }

}
