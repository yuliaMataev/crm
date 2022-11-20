import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { TestfireComponent } from './components/testfire/testfire.component';
import { IfUserLogin } from './services/authGate.service';

const routes: Routes = [

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent,canActivate:[IfUserLogin],
  children: [
     {path:'', component:CustomersComponent},
     {path: 'edit', component: EditUserComponent},
    {path: 'contacts', component: ContactsComponent}]}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'testfire', component:TestfireComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
