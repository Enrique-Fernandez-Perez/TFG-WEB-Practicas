import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url !: string;

  @Input()
  public alt !: string;

  ngOnInit(): void {
    if(!this.url){
      throw new Error('Method not implemented.');
    }
  }

  public hasLoaded : boolean = false;

  onLoad(){
    this.hasLoaded = true;
    // setTimeout(()=>{
    // },5000);
  }

}
