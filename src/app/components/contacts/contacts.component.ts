import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { Customer } from 'src/app/models/Customer';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {


  constructor(private contactService:ContactService) { }

  subscribe: any;
  contacts:Contact[]=[];
  contactsFilter: Contact[]=[];
  
  ngOnInit(): void {
    this.subscribe=this.contactService.contactsSubject.subscribe(data=>{
    this.contacts=data;
    this.search('');
    })
  }

 search(value:string){
    value=value.toLowerCase();
    this.contactsFilter=this.contacts.filter(c=>c.fullname.toLowerCase().includes(value)  )  
  }

     ngOnDestroy(): void {
      this.subscribe ? this.subscribe.unsubscribe() : null;
  }

}
