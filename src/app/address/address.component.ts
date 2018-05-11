import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {GridOptions} from 'ag-grid';
import {clone} from 'lodash';
import { findIndex } from 'lodash';
// import { SetFilterModel,AggFuncService,RowGroupCompFactory} from 'ag-grid-enterprise';

import {Address} from './address';
import {AddressService} from './address.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  subpagetitle= 'Look for Realtor';
  pagetitle= 'Realtors Page';
  address: Address[] = [];


  addressForm: boolean = false;
  isNewAddress:boolean;
  newAddress:any={};
  editAddressForm:boolean=false;
  editedAddress:any={};


  public statusgridOptions: GridOptions;
  // addressForm = new FormGroup({
  //   city: new FormControl('', Validators.required),
  //   street: new FormControl('', Validators.required),
  //   state: new FormControl('', Validators.required),
  //   country: new FormControl('', Validators.required),
  //   zip: new FormControl('', Validators.required)
  // });

  columndefs= [];
  private selectedaddress = Address;
  selectedRowsString = '';
  constructor(private addressservice: AddressService) {

    this.statusgridOptions = <GridOptions>{
      onGridReady: () => {
        this.statusgridOptions.api.sizeColumnsToFit();
      }
    };
  }

  ngOnInit() {
    this.statusgridOptions.rowData = null;
    this.statusgridOptions.columnDefs = this.columndefs;
    this.statusgridOptions.enableColResize = true;
    this.statusgridOptions.enableRangeSelection = true;
    this.statusgridOptions.enableSorting = true;
    this.statusgridOptions.animateRows = true;
    this.statusgridOptions.groupMultiAutoColumn = false;
    this.statusgridOptions.enableFilter = true;
    this.statusgridOptions.enableCellChangeFlash = true;

    // this.statusgridOptions.onRowClicked()
    this.columndefs.push({ headerName: 'City',  field: 'city',  width: 70 , editable: true });
    this.columndefs.push({ headerName: 'State',  field: 'state',  width: 70 , editable: true });
    this.columndefs.push({ headerName: 'County',  field: 'country',  width: 70 , editable: true });
    this.columndefs.push({ headerName: 'Street',  field: 'street',  width: 70 , editable: true });
    this.columndefs.push({ headerName: 'Zip',  field: 'zip',  width: 70 , editable: true   });

    this.columndefs.push( { headerName: 'Actions',  suppressMenu: true, suppressSorting: true,
      template:' <button type = "button" data-action-type = "update" class="btn btn-default"> Update </button>' +
               ' <button type = "button" data-action-type ="delete" class="btn btn-default"> Delete </button>' +
               ' <button type = "button" data-action-type ="add" class="btn btn-default"> Add </button>'
    });
    this.getAddress();
  }
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "update":
          return this.onActionUpdateClick(data);
        case "delete":
          return this.onActionRemoveClick(data);
        case "add":
          return this.onActionAddClick(data);
      }
    }
  }
  // onAddressFormSubmit(state:string,city:string,street:string,country:string,zip:string  ){
  //   //this.processValidation = true;
  //   console.log(city);
  //   const address = {
  //     'id':null,
  //     'city': city,
  //     'state' : state,
  //     'country' : country,
  //     'street': street,
  //     'zip':zip
  //   };
  //   this.addressservice.create(address);
  // }

  public saveAddress (address: Address) {
    console.log(' saveAddress ' + address);
    this.address.push(address);
    this.addressservice.create(address);
  }
  public onActionUpdateClick(data: any) {
    console.log('update action clicked', data);
    this.selectedaddress = data;
    const index = findIndex(this.address, ( a: Address )  => {
      return a.id === data.id;
    })
    this.address[index] = data;

    console.log(this.selectedaddress);
    this.addressservice.update(data);
  }
  public onActionAddClick(data: any) {
    console.log('Add action clicked', data);
    data.id = null;
    this.address.push(data);
    console.log(this.address);
    this.selectedaddress = data;
    console.log(this.selectedaddress);
    this.addressservice.create(data);
  }
  public onActionRemoveClick(data: any) {
    this.address.splice(this.address.indexOf(data), 1);
    console.log(this.address);
    this.addressservice.delete(data.id).then(() => {
      console.log(data + ' is deleted ');
    }) ;
  }
  add(name: string): void {
    // name = name.trim();
    // if (!name) { return; }
    // this.addressservice.create(name)
    //   .then(hero => {
    //     this.heros.push(hero);
    //     var res =  this.statusgridOptions.api.setRowData(this.heros);
    //   });
  }

  getAddress(): void {
    this.addressservice.getAddress().then(addresses => {
      this.address = addresses;
      this.statusgridOptions.api.setRowData(this.address);
    });
    console.log('In the address call  => ' + this.address.length);
  }
}
