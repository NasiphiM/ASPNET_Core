import { Component,OnInit } from '@angular/core';
import { AccountService } from '../_SERVICES/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  model: any ={}

  constructor(private accService: AccountService){}

  ngOnInit():void {
  }

  register(){
    this.accService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error =>{
        console.log(error)
      }
    })
  }

  cancel(){
    console.log('cancelled');
  }
}
