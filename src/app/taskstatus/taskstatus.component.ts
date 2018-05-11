import {Component, OnInit} from '@angular/core';
import { TreeModule, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

import {GridOptions} from 'ag-grid';
import { SetFilterModel, AggFuncService, RowGroupCompFactory} from 'ag-grid-enterprise';

// import {Task} from '../task';
import 'rxjs/add/operator/toPromise';
import 'bootstrap/dist/js/bootstrap.js';
import { ProductdetailsService } from './productdetails.service';
// import {AppConfigService} from '../app.config.service';
import {StatusRollupRenderModel} from './statusrolluprendermodel';
import {LlnljsonserviceService} from  './llnljsonservice.service';
@Component({
  selector: 'taskstatus',
  templateUrl: './taskstatus.component.html',
  styleUrls: ['../app.component.css'],
  providers: [ProductdetailsService,   LlnljsonserviceService]
})
export class TaskstatusComponent implements OnInit {
  public gridOptions: GridOptions;
  public statusgridOptions: GridOptions;
  keys: String []=[];
  //pagetitle:string ='parent name';
  // newTasks: Task[] = [];

  subpagetitle ='PAD: OPERATIONS, BUSINESS';
  pagetitle =' CAFE Task Status ';
  // taskstausrooluparr: TaskstatusRoleupModel[]=[];
  columndefs=[];
  taskrolldata: StatusRollupRenderModel[] =[];
  taskrolldata1: StatusRollupRenderModel[] =[];
  ngOnInit(): void {
    this.getTaskStatusRollupData();
    //
    // this.taskrolldata1 = this.projectService.getTaskStatusRollupTreeData();
    console.log(this.taskrolldata1.length);
    //
    this.columndefs.push({ headerName: 'wbs1Desc',  field: 'wbs1Desc',  width: 70  , rowGroup: true, hide:true });
    // this.columndefs.push({ headerName: 'wbs1Id',  field: 'wbs1Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs2Desc',  field: 'wbs2Desc',  width: 70 , rowGroup: true , hide:true});
    // this.columndefs.push({ headerName: 'wbs2Id',  field: 'wbs3Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs3Desc',  field: 'wbs3Desc',  width: 70 , rowGroup: true , hide:true});
    // this.columndefs.push({ headerName: 'wbs3Id',  field: 'wbs3Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs4Desc',  field: 'wbs4Desc',  width: 70  , rowGroup: true, hide:true});
    // this.columndefs.push({ headerName: 'wbs4Id',  field: 'wbs4Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs5Desc',  field: 'wbs5Desc',  width: 70  , rowGroup: true, hide:true});
    // this.columndefs.push({ headerName: 'wbs5Id',  field: 'wbs5Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs6Desc',  field: 'wbs6Desc',  width: 70  , rowGroup: true, hide:true});
    // this.columndefs.push({ headerName: 'wbs6Id',  field: 'wbs6Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs7Desc',  field: 'wbs7Desc',  width: 70 ,  rowGroup: true, hide:true });
    // this.columndefs.push({ headerName: 'wbs7Id',  field: 'wbs7Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs8Desc',  field: 'wbs8Desc',  width: 70 ,  rowGroup: true, hide:true});
    //this.columndefs.push({ headerName: 'wbs8Id',  field: 'wbs8Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs9Desc',  field: 'wbs9Desc',  width: 70  , rowGroup: true, hide:true} );
    // this.columndefs.push({ headerName: 'wbs9Id',  field: 'wbs9Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs10Desc',  field: 'wbs10Desc',  width: 70  , rowGroup: true, hide:true});
    // this.columndefs.push({ headerName: 'wbs10Id',  field: 'wbs10Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs11Desc',  field: 'wbs11Desc',  width: 70  , rowGroup: true, hide:true});
    //  this.columndefs.push({ headerName: 'wbs11Id',  field: 'wbs11Id',  width: 150 });
    this.columndefs.push({ headerName: 'wbs12Desc',  field: 'wbs12Desc',  width: 70 ,  rowGroup: true , hide:true});
    //   this.columndefs.push({ headerName: 'wbs12Id',  field: 'wbs12Id',  width: 150 });
    //
    // : number;

    this.columndefs.push({ headerName: 'orgNam',  field: 'orgNam',  width: 150 });
    this.columndefs.push({ headerName: 'projNam',  field: 'projNam',  width: 150 });
    this.columndefs.push({ headerName: 'projTaskNam',  field: 'projTaskNam',  width: 150 });
    this.columndefs.push({ headerName: 'ldgPrdDescYr',  field: 'ldgPrdDescYr',  width: 150 });

    this.columndefs.push({ headerName: 'Funding', children: [
      { headerName: 'lien',  field: 'lien',  width: 150, aggFunc: 'sum'},
      { headerName: 'prelien',  field: 'prelien',  width: 150 , aggFunc: 'sum' }
    ]});

    this.columndefs.push({ headerName: 'Costs', children: [
      { headerName: 'be',  field: 'be',   width: 150, aggFunc: 'sum'},
      { headerName: 'expiredfundamt',  field: 'expiredfundamt',  width: 150 , aggFunc: 'sum' }
    ]});
    this.columndefs.push({ headerName: 'Weekly Rates', children: [
      { headerName: 'currentliens',  field: 'currentliens',   width: 150, aggFunc: 'sum'},
      { headerName: 'costamt',  field: 'costamt',  width: 150 , aggFunc: 'sum' }
    ]});


    this.columndefs.push({ headerName: 'Projected Remaining', children: [
      { headerName: 'Montly',  field: 'currentmonthcostamt',  valueFormatter: currencyFormatter, width: 150, filter: 'number' , aggFunc: 'sum'},
      { headerName: 'YTD',  field: 'fundcarryoveramt', valueFormatter: currencyFormatter,  width: 150, aggFunc: 'sum'},
      {headerName: '%Spent',
        valueGetter: function chainValueGetter(params) {
          var usdFormate = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2
          });
          var percent = (params.getValue('fundcarryoveramt') /params.getValue('currentmonthcostamt'));
          return usdFormate.format( percent)+ '%';
        }},
    ]});

    function currencyFormatter(params) {
      var usdFormate = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      return usdFormate.format( params.value);
    }
    // this.columndefs.push({ headerName: 'lien',  field: 'lien',  width: 150, aggFunc: 'sum'});
    // this.columndefs.push({ headerName: 'prelien',  field: 'prelien',  width: 150 , aggFunc: 'sum' });
    // this.columndefs.push({ headerName: 'be',  field: 'be',   width: 150, aggFunc: 'sum'});
    // this.columndefs.push({ headerName: 'expiredfundamt',  field: 'expiredfundamt',  width: 150, aggFunc: 'sum'});
    // this.columndefs.push({ headerName: 'currentliens',  field: 'currentliens',  width: 150 , aggFunc: 'sum' });
    //  this.columndefs.push({ headerName: 'costamt',  field: 'costamt',   width: 150, aggFunc: 'sum'});
    // this.columndefs.push({ headerName: 'currentfyfundamt',  field: 'currentfyfundamt',  width: 150, aggFunc: 'sum'});
    //
    // pivotMode: true,
    //   enableColResize: true,
    //   columnDefs: columnDefs,
    //   floatingFilter:true,
    //   enableSorting:true

    this.statusgridOptions = <GridOptions>{};
    this.statusgridOptions.rowData = this.taskrolldata1;
    this.statusgridOptions.columnDefs = this.columndefs;
    this.statusgridOptions.enableColResize = true;
    this.statusgridOptions.enableRangeSelection= true;
    this.statusgridOptions.enableSorting = true;
    this.statusgridOptions.animateRows= true;
    this.statusgridOptions.groupMultiAutoColumn = false;
    this.statusgridOptions.enableFilter = true;
    this.statusgridOptions.groupDefaultExpanded = 13,
      this.statusgridOptions.onGridReady = () => {
        this.statusgridOptions.api.sizeColumnsToFit();
      };
    this.statusgridOptions.aggFuncs = {
      // this adds another function called 'abc'
      'projectedpercent': this.projectedpercent
    },
      this.statusgridOptions.autoGroupColumnDef={
        headerName:'Levels 1-12',
        valueGetter: function (params){
          return params.data ? params.data.wbs1Desc : ''
        }
      }
    //this.getTaskStatusRollupData1();
  }
  projectedpercent(values){

    return '123%';
  }
  constructor(private projectService: ProductdetailsService  , private llndata : LlnljsonserviceService) {
    // _configService.setOption('pagetitle', ' Cafe Task Set Maintenance');
    // _configService.setOption('subpagetitle', ' PAD: OPERATIONS, BUSINESS');
    this. getTaskStatusRollupData();
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowData = this.createRowData();
    this.gridOptions.columnDefs = this.createColumnDefs();
    this.gridOptions.groupUseEntireRow = true;
    this.gridOptions.groupMultiAutoColumn = true;
    this.gridOptions.groupDefaultExpanded = 1,
      this.gridOptions.onGridReady = () => {
        this.gridOptions.api.sizeColumnsToFit();
      };
  }
  getTaskStatusRollupData(): void {
    console.log(' StatusgridComponent getDataTaskStatus => ');
    this.projectService.getTaskStatusRollupTreeData( ).then(taskstausarr => {
      this.taskrolldata1 = taskstausarr;
      this.statusgridOptions.api.setRowData(this.taskrolldata1);
      //this.getSettings( Object.keys(this.taskrolldata[0]));

    });
    console.log('in taskstatus=> getTaskStatusRollupData taskrolldata length is => ' + this.taskrolldata.length);
  }



  private createColumnDefs() {
    return [
      {
        headerName: 'Country',
        field: 'country',
        width: 300,
        rowGroup: true
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 140
      },
      {
        headerName: 'Gold',
        field: 'gold',
        width: 150,
        aggFunc: 'sum'
      },
      {
        headerName: 'Silver',
        field: 'silver',
        width: 150,
        aggFunc: 'sum'
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
        width: 150,
        aggFunc: 'sum'
      },
    ];
  }

  private createRowData() {
    return [
      {country: 'United States', name: 'Bob', gold: 1, silver: 0, bronze: 0},
      {country: 'United States', name: 'Jack', gold: 0, silver: 1, bronze: 1},
      {country: 'United States', name: 'Sue', gold: 1, silver: 0, bronze: 1},
      {country: 'United Kingdom', name: 'Mary', gold: 1, silver: 1, bronze: 0},
      {country: 'United Kingdom', name: 'Tess', gold: 0, silver: 1, bronze: 1},
      {country: 'United Kingdom', name: 'John', gold: 0, silver: 2, bronze: 1},
      {country: 'Jamaica', name: 'Bob', gold: 1, silver: 1, bronze: 0},
      {country: 'Jamaica', name: 'Jack', gold: 1, silver: 1, bronze: 0},
      {country: 'Jamaica', name: 'Mary', gold: 1, silver: 1, bronze: 0},
      {country: 'South Africa', name: 'Bob', gold: 1, silver: 0, bronze: 1},
      {country: 'South Africa', name: 'Jack', gold: 1, silver: 0, bronze: 1},
      {country: 'South Africa', name: 'Mary', gold: 1, silver: 0, bronze: 1},
      {country: 'South Africa', name: 'John', gold: 1, silver: 0, bronze: 1},
      {country: 'New Zealand', name: 'Bob', gold: 1, silver: 0, bronze: 0},
      {country: 'New Zealand', name: 'Jack', gold: 0, silver: 1, bronze: 1},
      {country: 'New Zealand', name: 'Sue', gold: 1, silver: 0, bronze: 1},
      {country: 'Australia', name: 'Mary', gold: 1, silver: 1, bronze: 0},
      {country: 'Australia', name: 'Tess', gold: 0, silver: 1, bronze: 1},
      {country: 'Australia', name: 'John', gold: 0, silver: 2, bronze: 1},
      {country: 'Canada', name: 'Bob', gold: 1, silver: 1, bronze: 0},
      {country: 'Canada', name: 'Jack', gold: 1, silver: 1, bronze: 0},
      {country: 'Canada', name: 'Mary', gold: 1, silver: 1, bronze: 0},
      {country: 'Switzerland', name: 'Bob', gold: 1, silver: 0, bronze: 1},
      {country: 'Switzerland', name: 'Jack', gold: 1, silver: 0, bronze: 1},
      {country: 'Switzerland', name: 'Mary', gold: 1, silver: 0, bronze: 1},
      {country: 'Switzerland', name: 'John', gold: 1, silver: 0, bronze: 1},
      {country: 'Spain', name: 'Bob', gold: 1, silver: 0, bronze: 0},
      {country: 'Spain', name: 'Jack', gold: 0, silver: 1, bronze: 1},
      {country: 'Spain', name: 'Sue', gold: 1, silver: 0, bronze: 1},
      {country: 'Portugal', name: 'Mary', gold: 1, silver: 1, bronze: 0},
      {country: 'Portugal', name: 'Tess', gold: 0, silver: 1, bronze: 1},
      {country: 'Portugal', name: 'John', gold: 0, silver: 2, bronze: 1},
      {country: 'Zimbabwe', name: 'Bob', gold: 1, silver: 1, bronze: 0},
      {country: 'Zimbabwe', name: 'Jack', gold: 1, silver: 1, bronze: 0},
      {country: 'Zimbabwe', name: 'Mary', gold: 1, silver: 1, bronze: 0},
      {country: 'Brazil', name: 'Bob', gold: 1, silver: 0, bronze: 1},
      {country: 'Brazil', name: 'Jack', gold: 1, silver: 0, bronze: 1},
      {country: 'Brazil', name: 'Mary', gold: 1, silver: 0, bronze: 1},
      {country: 'Brazil', name: 'John', gold: 1, silver: 0, bronze: 1}];
  }
  getSettings(keys): void{
    // this.columndefs =this.createColumnDefs();
    console.log(' task status getSettings => ' + this.columndefs.length);




  }

}
