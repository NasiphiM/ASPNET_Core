import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_SERVICES/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @Output() cancelReg = new EventEmitter();
  registerForm : FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors : string[] | undefined;

  constructor(private accService: AccountService, private toastr: ToastrService, private fb : FormBuilder,
              private router: Router){}

  ngOnInit():void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
    const dob = this.getDateOnly(this.registerForm.controls['DateOfBirth'].value);
    const values = {...this.registerForm.value, DateOfBirth: dob }

    this.accService.register(values).subscribe({ //this.model -> for normal forms
                                                                  // & this.registerForm.value -> Reactive Form
      next: () => {
        this.router.navigateByUrl('/members'); // Navigates back to members page
      },
      error: err =>{
        this.validationErrors = err;
      }
    })
  }

  cancel(){
    this.cancelReg.emit(false);
  }

  private getDateOnly(dob: string | undefined){
    if (!dob)
      return;
    let theDob = new Date(dob);   //date displays the whole date including time
    //to get the minutes from that date to this
    let dateMin = new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset()));

    //convert date into string format YYYY-MM-DD eg 2023-04-26T11:06:01Z
    let isodate = dateMin.toISOString();

    //now I want the first 10 characters of the string , which will represent the date

    return isodate.slice(0, 10);
  }
}
