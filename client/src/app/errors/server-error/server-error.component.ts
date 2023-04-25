import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements  OnInit{
  err:any;
  constructor(private router: Router){
    const nav = this.router.getCurrentNavigation();
    this.err = nav?.extras?.state?.['err'];
  }
  ngOnInit() {
  }
}
