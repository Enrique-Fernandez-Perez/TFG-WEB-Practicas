import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  public options :number[] = [10,15,20,25,30];

  @ViewChild('txtTagInput')
  tagInput !: ElementRef<HTMLInputElement>;

  @ViewChild('numResultOption')
  numResultOption !: ElementRef<HTMLSelectElement>;

  constructor(private gifsService: GifsService){}

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.tagInput.nativeElement.value = '';

    this.chanceResult();
    this.gifsService.searchTag(newTag);
  }

  chanceResult(){
    const resultImg = this.numResultOption.nativeElement.value;
    this.gifsService.numResult = Number(resultImg);
  }
}
