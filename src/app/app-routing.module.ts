import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddressComponent} from './address/address.component';
import {HomeComponent} from './home/home.component';
import {TaskstatusComponent} from './taskstatus/taskstatus.component';
import { ManagetasksetsComponent } from './managetasksets/managetasksets.component';

const routes: Routes = [
  { path: '', redirectTo: 'address', pathMatch: 'full' },
  { path: 'address', component: AddressComponent },
  { path: 'homes', component: HomeComponent },
  { path: 'taskstatus', component: TaskstatusComponent },
  { path: 'managetaskset', component: ManagetasksetsComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
