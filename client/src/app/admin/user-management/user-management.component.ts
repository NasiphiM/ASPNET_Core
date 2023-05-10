import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from 'src/app/modals/roles-modals/roles-modals.component';
import { User } from 'src/app/_models/user';
import { AminService } from 'src/app/_SERVICES/amin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalsComponent> = new BsModalRef<RolesModalsComponent>();
  availableRoles = [ 'Admin', 'Moderator', 'Member' ]
  constructor(private adminService: AminService, private modalService: BsModalService){}
  ngOnInit():void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){                // a function that simply returns an array of users that have specific roles
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    })
  }

  //this creates a pop-up
  openRolesModal(user: User){
  const config = {
    class: 'modal-dialog-centered',
    initialState:{
      username: user.username,
      availableRoles: this.availableRoles,
      selectedRoles: [...user.roles]
    }
  }
    this.bsModalRef = this.modalService.show(RolesModalsComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, user.roles)){
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  //checks if the two passed arrays are equal in length and context
  private arrayEqual (arr1: any[], arr2: any[]){
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
