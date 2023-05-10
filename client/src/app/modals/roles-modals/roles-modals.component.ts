import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modals',
  templateUrl: './roles-modals.component.html',
  styleUrls: ['./roles-modals.component.css']
})
export class RolesModalsComponent implements OnInit{
  username ='';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() : void {
  }

  updateChecked(checkedVal: string){
    const ind = this.selectedRoles.indexOf(checkedVal);

    //if = -1 then means its not checked (ticked off)
    /*
    * if (ind !== -1)
    *   this.selectedRoles.splice(ind,1)
    * else
    *   this.selectedRoles.push(checkedVal)
    */
    ind !== -1 ? this.selectedRoles.splice(ind,1) : this.selectedRoles.push(checkedVal);
  }
}
