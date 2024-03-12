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

  keysTranslation : string[] = ["ara", "bre", "ces", "cym", "deu", "est", "fin", "fra", "hrv", "hun", "ita", "jpn", "kor", "nld", "per", "pol", "por", "rus", "slk",
    "spa", "srp", "swe", "tur", "urd", "zho"
  ];

  constructor(private activatedRoute : ActivatedRoute,
    private countriesService : CountriesService,
    private router : Router){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryAlphaCode(id)))
      .subscribe(country => {
        if(!country){
          return this.router.navigateByUrl('');
        }
        this.country = country;
        return;
      });
  }
}
