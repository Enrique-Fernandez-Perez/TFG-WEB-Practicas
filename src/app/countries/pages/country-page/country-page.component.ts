import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country, Translation } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country ?: Country;

  public listTranslations ?: {[key: string]: Translation };
  public translations : Translation[] = [];

  keysTranslation : string[] = [];

  listLKeysAndTranslations : [string,string][] = [['','']];

  constructor(private activatedRoute : ActivatedRoute,
    private countriesService : CountriesService,
    private router : Router){
      this.listLKeysAndTranslations.shift();
    }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryAlphaCode(id)))
      .subscribe(country => {
        if(!country){
          return this.router.navigateByUrl('');
        }

        this.country = country;
        this.listTranslations = country.translations;

        for (let key of Object.keys(this.listTranslations)) {
          this.translations.push(this.listTranslations[key]);
          this.keysTranslation.push(key);

          this.listLKeysAndTranslations.push([key,this.listTranslations[key].common]);

        }
        return;
      });
  }
}
