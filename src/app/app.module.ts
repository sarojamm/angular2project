import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular/main';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TreeModule } from 'angular-tree-component';


import { AppRoutingModule } from './app-routing.module';
import { AppNavheaderComponent} from './app-navheader.component';

import {AddressService} from './address/address.service';
import  { HomeService } from './home/home.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { AddressComponent } from './address/address.component';
import { HomeComponent } from './home/home.component';
import { TaskstatusComponent } from './taskstatus/taskstatus.component';
import { ManagetasksetsComponent } from './managetasksets/managetasksets.component';

import {LlnljsonserviceService} from './taskstatus/llnljsonservice.service';
import { DataselectorComponent } from './dataselector/dataselector.component';
import { HomeitemComponent } from './homeitem/homeitem.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavheaderComponent,
    AddressComponent,
    HomeComponent,
    TaskstatusComponent,
    DataselectorComponent,
    ManagetasksetsComponent,
    HomeitemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    TreeModule,
    AppRoutingModule,
    AgGridModule.withComponents(
      [
      ])

  ],
  providers: [
    AddressService,
    HomeService,
    LlnljsonserviceService,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'New Cafe';
}
