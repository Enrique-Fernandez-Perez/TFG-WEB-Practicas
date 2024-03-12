import { Component, ElementRef, Input, Output, ViewChild, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private dbouncer :Subject<string>= new Subject<string>();
  private debouncerSuscription ?: Subscription;

  @Input()
  initialValue:string ='';

  @Input()
  placeholder:string ='';

  @Output()
  onDebounce : EventEmitter<string> = new EventEmitter<string>;

  ngOnInit() : void{
    this.debouncerSuscription = this.dbouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => this.emitValue(value));
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value:string):void{
    if(!value){return}
    this.onDebounce.emit(value);
  }

  onKeyPress(searchTerm : string){
    this.dbouncer.next(searchTerm);
  }
}
