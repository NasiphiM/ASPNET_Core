import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_SERVICES/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  messages?: Message[];
  pagination?: Pagination;
  container = 'Unread';
  pageNum = 1;
  pageSize= 5;
  loading = false;

  constructor(private msgService: MessageService){}

  ngOnInit() :void{
    this.loadMessages();
  }

  loadMessages(){
    this.loading = true;
    this.msgService.getMessages(this.pageNum, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    })
  }

  deleteMessage(id: number){
    this.msgService.deleteMessage(id).subscribe({
      next: ()=> this.messages?.splice(this.messages.findIndex(
         m=> m.id === id
      ), 1)
    })
  }
  pageChanged(event:any){
    if(this.pageNum !== event.page){
      this.pageNum = event.page;
      this.loadMessages();
    }
  }
}
