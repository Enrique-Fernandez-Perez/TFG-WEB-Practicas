import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  countries : Country[] = [];

  public regions : Region[] = ['Asia', 'America', 'Africa','Europe', 'Oceania'];

  public selectRegion ?: Region;

  constructor(private countriesService : CountriesService){}

  searchByRegion( region : Region) : void{
    this.selectRegion = region;
    this.countriesService.searchRegion(region).
      subscribe(countries =>{
        this.countries = countries;
      })
  }

  ngOnInit(){
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectRegion = this.countriesService.cacheStore.byRegion.region;
  }
}
