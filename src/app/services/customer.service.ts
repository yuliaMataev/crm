import { Injectable, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Customer, UserStatus } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  unsubscribe:any=null;
  @Input() disabled=false;
   
  constructor(private afs:AngularFirestore, private router:Router) { 
    this.subscribeToCustomersCollection();
  }

  customerCollection:string='customers';
  customers:Customer[]=[];
  customerSubject = new BehaviorSubject <Customer[]> (this.customers)
  
  createCustomer(customer:Customer){
    const pathToDoc=this.customerCollection+'/'+customer.id;
    return this.afs.doc(pathToDoc).set(customer.toFirebase())
  }
  
   subscribeToCustomersCollection(status:UserStatus=1) { 
    if(this.unsubscribe!==null){
      return;
    }
    this.unsubscribe=this.afs.collection(this.customerCollection).ref.where('status','==',status).onSnapshot((documents) => {
      this.customers=[];
      documents.forEach((doc) => {
        this.customers.push(Customer.fromFirebaseToCkass(doc.data()))
      })
      this.customerSubject.next(this.customers);
     },error => console.error(error))
  }

    deleteCustomerById(id: number) {
    return this.afs.doc(this.customerCollection+"/"+id).set({status:0},{merge:true})
  }

}
 