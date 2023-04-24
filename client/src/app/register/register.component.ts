import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_SERVICES/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  @Output() cancelReg = new EventEmitter();
  model: any ={}

  constructor(private accService: AccountService, private toastr: ToastrService){}

  ngOnInit():void {
  }

  register(){
    this.accService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: err =>{
        this.toastr.error(err.error),
        console.log(err);
      }
    })
  }

  cancel(){
    this.cancelReg.emit(false);
  }
}
