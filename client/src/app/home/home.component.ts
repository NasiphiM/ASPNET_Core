import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerNode = false;

  constructor(){}
  ngOnInit() {
  }

  registerToggle(){
    this.registerNode = !this.registerNode;
  }
  cancelReg(){
    //Add Code here : lecture 61
  }
}
