import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_SERVICES/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit{
  members: Member[] | undefined;
  predicate = 'liked';
  pageNum = 1;
  pageSize = 5;
  pagination: Pagination | undefined;

  constructor(private memService: MembersService) {}

  ngOnInit() : void {

  }

  loadLikes(){
    this.memService.getLikes(this.predicate, this.pageNum, this.pageSize).subscribe({
      next: res => {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    })
  }

  pageChanged(event: any){
    if (this.pageNum !== event.page){
      this.pageNum = event.page;
      this.loadLikes();
    }
  }
}
