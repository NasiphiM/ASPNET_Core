import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_SERVICES/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent  implements OnInit{
 // members$: Observable<Member[]>| undefined;
  members: Member[] = [];
  pagination : Pagination | undefined;

  //these are example values
  pageNum =1;
  pageSize = 5;
  constructor(private memberService: MembersService){}

  ngOnInit() : void{
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.pageNum, this.pageSize).subscribe({
      next: res => {
        if (res.result && res.pagination){
          this.members = res.result;
          this.pagination = res.pagination;
        }
      }
    })
  }

}
