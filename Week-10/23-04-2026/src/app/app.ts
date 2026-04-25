import { Component } from '@angular/core';
import { WeatherRecord, WeatherComponent } from './weather/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [WeatherComponent]
})
export class App {
  weatherData: WeatherRecord[] = [
    { name: 'London',    temperature: '18°C', wind: '12 km/h NW', humidity: '72%' },
    { name: 'New York',  temperature: '24°C', wind: '8 km/h SE',  humidity: '60%' },
    { name: 'Tokyo',     temperature: '29°C', wind: '15 km/h E',  humidity: '80%' },
    { name: 'Paris',     temperature: '21°C', wind: '10 km/h SW', humidity: '65%' },
    { name: 'Sydney',    temperature: '16°C', wind: '20 km/h S',  humidity: '55%' },
    { name: 'Mumbai',    temperature: '33°C', wind: '18 km/h W',  humidity: '88%' },
    { name: 'Jaipur',    temperature: '38°C', wind: '5 km/h NE',  humidity: '30%' },
    { name: 'Dubai',     temperature: '41°C', wind: '9 km/h N',   humidity: '42%' },
    { name: 'Moscow',    temperature: '15°C', wind: '7 km/h NW',  humidity: '70%' },
    { name: 'Rio de Janeiro', temperature: '27°C', wind: '12 km/h SE', humidity: '75%' },
    { name: 'Cape Town', temperature: '19°C', wind: '14 km/h SW', humidity: '68%' },
    { name: 'Beijing',   temperature: '26°C', wind: '10 km/h E',  humidity: '78%' },
    { name: 'Berlin',    temperature: '20°C', wind: '6 km/h NW',  humidity: '62%' },
    { name: 'Singapore', temperature: '30°C', wind: '8 km/h S',   humidity: '85%' },
    { name: 'Los Angeles', temperature: '22°C', wind: '5 km/h W',  humidity: '58%' },
    { name: 'Rome',      temperature: '25°C', wind: '11 km/h SW', humidity: '67%' },
    { name: 'Bangkok',   temperature: '32°C', wind: '14 km/h SE', humidity: '90%' },
    { name: 'Toronto',   temperature: '19°C', wind: '9 km/h NE',  humidity: '65%' },
    { name: 'Istanbul',  temperature: '23°C', wind: '13 km/h NW', humidity: '70%' },
    { name: 'Seoul',     temperature: '28°C', wind: '12 km/h E',  humidity: '80%' },
    { name: 'Kanpur',    temperature: '35°C', wind: '10 km/h S',  humidity: '85%' },
    
  ];
}