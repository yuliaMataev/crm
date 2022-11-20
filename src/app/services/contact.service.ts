import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  unsubscribe:any=null;

  constructor(private afs:AngularFirestore) { 
    this.subscribeToContactsCollection();
  }

  contactsCollection:string='contacts';
  contacts:Contact[]=[];
  contactsSubject = new BehaviorSubject <Contact[]> (this.contacts)

    subscribeToContactsCollection() { 
    if(this.unsubscribe!==null){
      return;
    }
    this.unsubscribe=this.afs.collection(this.contactsCollection).ref.onSnapshot((documents) => {
      this.contacts=[];
      documents.forEach((doc) => {
        this.contacts.push(Contact.fromFirebaseToCkass(doc.data())  )
      })
      this.contactsSubject.next(this.contacts);
     },error => console.error(error))
  }

}
