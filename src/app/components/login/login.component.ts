import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tryToLogin: boolean=false;

  constructor(private userServics:UserService,private route:Router){ }

  password:string='';
  email:string='';

  ngOnInit(): void {
this.userServics.isLoggedIn().then((res)=>{ if (res === true) {
  this.route.navigate(['/dashboard'])
}}) 

   }

  login(){
     
     
    
    this.tryToLogin=true;
    this.userServics.login(this.email,this.password).catch((error)=>{
        this.tryToLogin=false;
       if(!this.email){ 
          Swal.fire({
          position: 'top',
          icon: 'error',
          title:'Email is required',
          showConfirmButton: false,
          timer: 2000
        })}
     else if(!this.password){
          Swal.fire({
          position: 'top',
          icon: 'error',
          title:'Password is required',
          showConfirmButton: false,
          timer: 2000
        })}
        else {
                 Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'The email or password is wrong',
          showConfirmButton: false,
          timer: 2000
        })
        }

    });
  }

}
