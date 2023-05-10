import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_SERVICES/account.service';

@Directive({
  selector: '[appHasRole]' //how to user: *appHasRole ='["Admin", "Thing"]', since structural Directive
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[] = [];
  user:User = {} as User;

  constructor(private viewContRef: ViewContainerRef, private tempRef: TemplateRef<any>, private accService: AccountService) {
    this.accService.currUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user)
          this.user = user
      }
    })
  }

  //this is where our logic goes
  ngOnInit(): void{
    if (this.user.roles.some(r =>this.appHasRole.includes(r))) { //we're basicallmy checking if the roles provided are part of regulated roles
      this.viewContRef.createEmbeddedView(this.tempRef);
    }
    else{
      this.viewContRef.clear();
    }

  }

}
