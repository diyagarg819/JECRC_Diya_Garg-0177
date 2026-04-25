import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WeatherRecord {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.css']
})
export class WeatherComponent implements OnInit {
  @Input() weatherData: WeatherRecord[] = [];

  searchInput: string = '';
  result: WeatherRecord | null = null;
  searched: boolean = false;

  ngOnInit(): void {}

  onSearch(value: string): void {
    this.searchInput = value;
    if (!value.trim()) {
      this.searched = false;
      this.result = null;
      return;
    }
    this.searched = true;
    const found = this.weatherData.find(
      city => city.name.toLowerCase() === value.trim().toLowerCase()
    );
    this.result = found || null;
  }
}