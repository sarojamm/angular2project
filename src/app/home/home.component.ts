import { Component, OnInit } from '@angular/core';

import {GridOptions} from 'ag-grid';

import { HomeService } from './home.service';
import { Home } from './home';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes: Home[] = [];
  public statusgridOptions: GridOptions;
  columndefs = [];

  constructor( private homeservice: HomeService) {
    this.statusgridOptions = <GridOptions>{
      onGridReady: () => {
        this.statusgridOptions.api.sizeColumnsToFit();
      }
    };
  }
  ngOnInit() {
    console.log('in home component ');
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
    this.columndefs.push({ headerName: 'Discription',  field: 'discription',  width: 70 , editable: true });
    this.columndefs.push({ headerName: 'Price',  field: 'price',  width: 70 , editable: true });
    // discription: string;
    // address: Address;
    // price: number;
    // homedetails: HomeDetails;
    // this.columndefs.push( { headerName: 'Actions',  suppressMenu: true, suppressSorting: true,
    //   template:' <button type = "button" data-action-type = "update" class="btn btn-default"> Update </button>' +
    //   ' <button type = "button" data-action-type ="delete" class="btn btn-default"> Delete </button>' +
    //   ' <button type = "button" data-action-type ="add" class="btn btn-default"> Add </button>'
    // });
    this.getHomes();
  }
  getHomes(): void {
    this.homeservice.getHomes().then(homes => {
      this.homes = homes;
      this.statusgridOptions.api.setRowData(this.homes);
      console.log('In the get home call  => ' + this.homes.length);
    });
  }
}
