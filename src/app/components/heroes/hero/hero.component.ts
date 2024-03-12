import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  name:string ='iron man';
  age:number = 45;

  change = {'name':true , 'age':true};

  get capitalizedName(): string{
    return this.name.toUpperCase();
  }

  getHeroDescriptio():string{
    // return this.name + " are " + this.age + " yeras old";
    // return `${this.name} are ${this.age} yeras old`;
    return `${this.name} - ${this.age}`;
  }

  changeHero():void{
    this.name = 'Spiderman';
    this.change['name'] = false;
  }

  changeAge():void{
    this.age = Number((Math.random()*100).toFixed(0));
    this.change['age'] = false;
    // this.age = Math.random()*100;
    // this.age = Number(this.age.toFixed(0));
  }

  resetForm():void{
    this.name ='iron man';
    this.age = 45;

    this.change['name'] = true;
    this.change['age'] = true;
  }
}
