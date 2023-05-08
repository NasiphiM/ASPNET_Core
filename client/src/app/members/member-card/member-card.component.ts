import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Member} from 'src/app/_models/member';
import { MembersService } from 'src/app/_SERVICES/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MemberCardComponent implements OnInit{
  @Input() member: Member | undefined;
  constructor(private memService: MembersService, private toastr: ToastrService) {
  }
  ngOnInit(): void {}

  addLike(mem: Member){
    this.memService.addLike(mem.userName).subscribe({
      next: () => this.toastr.success('You have liked' + mem.knownAs)
    })
  }
}
