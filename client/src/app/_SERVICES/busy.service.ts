import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;  //As a request is taking place, then we're going to increase this busy count (if

  constructor(private spinService : NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinService.show(undefined, {
      type:'ball-spin-fade',
      bdColor:'rgba(255,255,255,0)',
      color: '#ffe6ff'
    })
  }

  idle(){
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinService.hide();
    }
  }
}
