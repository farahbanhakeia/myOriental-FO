import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Console } from 'console';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-weatherinfo',
  templateUrl: './weatherinfo.component.html',
  styleUrl: './weatherinfo.component.css',
  providers:[WeatherService]

})
export class WeatherinfoComponent  implements OnInit{

  cityName ='Mumbai';
  data=
  {
    temp:'',
    feelsLike:'',
    pressure:'',
    humidity:'',
    city:'',
    main:'',
    imageURL:'' 
  }
  constructor(private readonly weatherService : WeatherService){}
  ngOnInit():void{
    this.loadData();
  }
  loadData()
  {
    if(this.cityName)
      {
       this.weatherService.fetchData(this.cityName).subscribe({
        next:(data:any)=>
          {
            this.data.temp = data.main.temp;
            this.data.feelsLike=data.main.feels_like;
            this.data.pressure=data.main.pressure;
            this.data.humidity=data.main.humidity;
            this.data.city = data.name;
            this.data.imageURL=data.weather[0].icon;
            this.data.main= data.weather[0].main;
          },
          error:(err)=>{
           console.log('Error while fetching data',err);
            
          },
       })
      }
  }


}
