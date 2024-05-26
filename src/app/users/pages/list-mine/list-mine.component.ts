import { Component, inject } from '@angular/core';
import { Actividades } from 'src/app/activities/interfaces/actividades';
import { ActividadesService } from 'src/app/activities/services/actividades.service';

@Component({
  selector: 'app-list-mine',
  templateUrl: './list-mine.component.html',
  styles: [
  ]
})
export class ListMineComponent {

  actividades : Actividades[] = [];

  private actividadesService = inject(ActividadesService);

  //  TODO usar servicio actividades para traer las actividades
  ngOnInit(){
    this.actividadesService.getMine().subscribe(data =>{
        this.actividades = data;
      });
    }
}
