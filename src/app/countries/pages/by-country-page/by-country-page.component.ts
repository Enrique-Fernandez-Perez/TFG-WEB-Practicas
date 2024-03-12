import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  countries : Country[] = [];

  initialValue : string = '';

  constructor(private countriesService : CountriesService){}

  searchByCountry( term : string) : void{
    this.countriesService.searchCountry(term).
      subscribe(countries =>{
        this.countries = countries;
      })
  }

  ngOnInit(){
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

}
