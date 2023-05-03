import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  registerForm : FormGroup = new FormGroup({});

  constructor(private accService: AccountService, private toastr: ToastrService, private fb : FormBuilder){}

  ngOnInit():void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender : ['male'],  //radio button that initialises value to male
      username : ['', Validators.required ],
      knownAs : ['', Validators.required ],
      DateOfBirth : ['', Validators.required ],
      City : ['', Validators.required ],
      Country : ['', Validators.required ],
      password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword : ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) =>{
      return control.value === control.parent?.get(matchTo)?.value ? null :{
        notMatching : true                                //this is a property name
      }
    }
  }
  register(){
    console.log(this.registerForm?.value)
    /*this.accService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: err =>{
        this.toastr.error(err.error),
        console.log(err);
      }
    })*/
  }

  cancel(){
    this.cancelReg.emit(false);
  }
}
