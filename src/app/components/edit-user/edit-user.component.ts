import { IfStmt } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit,OnDestroy {
  subscribe: any;

  constructor(private customerService:CustomerService, private route:ActivatedRoute) { }
 

    customer: Customer = new Customer();
     uid:Number=-1;    
     @Input() disabled= this.customerService.disabled

  ngOnInit(): void {
this.route.queryParams
.subscribe(params=>{
  if(params && params['uid']){
    this.uid=Number(params['uid'])
    if(typeof this.uid=='number'){
    this.getUserFromDBById(this.uid);
    }
  }
  if(params['disabled'] && params['disabled']==='true'){
    this.customerService.disabled=true; 
    this.disabled= this.customerService.disabled
    
  }else{
     this.customerService.disabled=false; 
      this.disabled= this.customerService.disabled
  }

})
  }

  getUserFromDBById(uid:Number){
    this.subscribe=this.customerService.customerSubject.subscribe(data=>{
      const customer=data.find(c=>c.id===uid);
      if(customer){
        this.customer=customer;
    }
  })
  }

  save() {
    if (this.customer.firstName.length < 1) {
      this.error("First name must be at least 3 characters long");
      return;
    }
    if (this.customer.lastName.length < 1) {
      this.error("Last name must be at least 3 characters long");
      return;
    }
    if (this.customer.email.length < 1) { 
      this.error("Email must be at least 3 characters long");
      return;
    }
    this.customerService.createCustomer(this.customer).then(()=>{
      this.customer = new Customer();
      Swal.fire({
        title:'Customer created successfully!',
        timer: 1500
        }
      )
    }).catch((error)=>{
     this.error(error.message); 
    })
    }

  error(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })
  }

   ngOnDestroy(): void {
    this.subscribe ? this.subscribe.unsubscribe() : null ;
  }

}
