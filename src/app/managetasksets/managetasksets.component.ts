import {Component, OnInit,OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Subject }           from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';

import * as $ from 'jquery';
import 'rxjs/add/operator/toPromise';
import 'bootstrap/dist/js/bootstrap.js';
import { ProductdetailsService } from '../taskstatus/productdetails.service';
import {LlnljsonserviceService} from '../taskstatus/llnljsonservice.service';

import {CafeTsdUser} from '../dataselector/CafeTsdUser';
import {TaskModel} from '../dataselector/taskmodel';
import {TaskSetModel} from '../taskstatus/tasksetmodel';

@Component({
  selector: 'taskstatus',
  templateUrl: './managetasksets.component.html',
  styleUrls: ['./managetasksets.component.css'],
  providers: [ProductdetailsService,  LlnljsonserviceService]
})
export class ManagetasksetsComponent implements OnInit, OnChanges {
  istask: boolean=true;
  message: String=' <Message in Progress> !! ';
  alltasksfortaskset : TaskModel[] = [];
  projTasks: TaskModel[] = [];
  divTasks: TaskModel[] = [];
  raTasks: TaskModel[] = [];
  padTasks: TaskModel[] = [];
  adTasks: TaskModel[] = [];
  piTasks: TaskModel[] = [];
  projtasksTasks:  TaskModel[] = [];

  projects: TaskModel[]   = [];
  divisions: TaskModel[]  = [];
  pads: TaskModel[]    = [];
  ads: TaskModel[]  = [];
  pis: TaskModel[]  = [];
  ras: TaskModel[]  = [];
  projs: TaskModel[]  = [];
  private ctsds1:Observable<TaskModel[]>;
  ctsds: TaskModel[]  = [];
  usersbyctsd:  CafeTsdUser[]  = [];
  newTasks: TaskModel[] = [];

  selectedprojtasks: TaskModel[] = [];
  selecteddivisions: TaskModel[]  = [];
  selectedpads: TaskModel[] = [];
  selectedads: TaskModel[] = [];
  selectedpis: TaskModel[] = [];
  selectedras: TaskModel[] = [];

  list: TaskSetModel[]  = [];
  divtitle ='Divisions ';
  title2 ='Project/Task ';
  projtasktitle ='Proj / Task  ';
  padtitle ='PAD    ';
  adtitle ='AD    ';
  ratitle ='RA ';
  pititle ='PI ';
//this should be get from login page and assigned to productdetails.service => setUserId
// and use  productdetails.service => getUserId to get the userid.
  userId = 'speck3';

  searchproject ='';
  private alldata = '/getDataByTaskSet/';
  private projectsUrl = '/projects';  // URL to web api


  private projectsbykey = '/getprojectsbykey/';

  private availdivUrl = '/availabledevisionbyq';
  private availprojUrl = '/availabletasksbyprojects/';

  private availpadUrl = '/availablepadbyq';
  private availadUrl = '/availableadbyq';
  private availraUrl = '/availablerabyq';
  private availpiUrl = '/availablepibyq';
  private availctsdUrl = '/availablecafetsds';

  private selectedprotasksUrl = '/assignedprojtasksbyq/';
  private selecteddivUrl = '/assigneddevisionbyq/';
  private selectedpadUrl = '/assignedpadbyq/';
  private selectedadUrl = '/assignedadbyq/';
  private selectedraUrl = '/assignedrabyq/';
  private selectedpiUrl = '/assignedpibyq/';
  private getUsersByTsdId = '/getUsersByTsdId/';
  // private selectedctsdUrl = '/selectedcafetsds';
  private subject: Subject<string> = new Subject();
  subpagetitle ='PAD: OPERATIONS, BUSINESS';
  pagetitle ='  Cafe Task Set Maintenance ';

  tasksetname='';
  selectedCafeTsd: TaskModel = new TaskModel(2017, 0, 0,0,'' ) ;
  ngOnInit(): void {
    this.projectService.setUserId(this.userId);    //   this.projectService.getdata(this.availdivUrl);      //
    this.subject.debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchTextValue => { this.getProjectsByKey(searchTextValue);})
    ;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      console.log(this.userId);
    });
    // this.projectService.getdata(this.availctsdUrl+'/'+this.userId).then(pis => this.ctsds = pis);
    // this.projectService.getdata(this.availdivUrl).then(divs => this.divisions = divs);
    // this.projectService.getdata(this.availpadUrl).then(pads => this.pads = pads);
    // this.projectService.getdata(this.availadUrl).then(ads => this.ads = ads);
    // this.projectService.getdata(this.availraUrl).then(ras => this.ras = ras);
    // this.projectService.getdata(this.availpiUrl).then(pis => this.pis = pis);
    this.getData();
  }
  getData(){
    this.divisions = this.jsonservice.getDivisions();
    this.ads = this.jsonservice.getAds();
    this.pads = this.jsonservice.getPads();
    this.pis = this.jsonservice.getPis();
    this.ras = this.jsonservice.getRas();
    this.ctsds = this.jsonservice.getCafeTsds();
  }
  onKeyUP(searchTextValue: string){
    this.subject.next(searchTextValue);
  }
  searchtag:string = '';
  getProjectsByKey(newValue) {
    console.log('getProjectsByKey ' + newValue);
    this.projects  = [];
    if(newValue === '') return;
    this.searchtag = newValue;
    this.projectService.getdata(this.projectsbykey+newValue).then(projects => this.projects = projects);
  }
  getTaskSet(row){
    this.projects  = [];
    console.log(' getTaskSet ' + row.tsdNam +' => ' + row.tsdId);
    this.searchtag = row.tsdNam;
    this.projectService.getdata(this.availprojUrl+row.tsdId).then(projects => this.projs = projects);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(' ManageTasksetsComponent curVal=>');
    // for (let propName in changes) {
    //     let change = changes[propName];
    //      let curVal  = JSON.stringify(change.currentValue);
    //   //   let prevVal = JSON.stringify(change.previousValue);
    //   console.log(' ManageTasksetsComponent curVal=>' +curVal)
    //   // if (propName === 'filteredItems') {  }
    // }
  }
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProductdetailsService
    ,private  jsonservice: LlnljsonserviceService  ) {
    // _configService.setOption('pagetitle', ' Cafe Task Set Maintenance');
    // _configService.setOption('subpagetitle', ' PAD: OPERATIONS, BUSINESS');
  }

  ///////////////////////////////
  getAssiginedUserForTsdId ( row ) {
    this.clearselecteddata();
    this.cleardata();
    this.selectedCafeTsd = row;
    console.log('in addToCafeTSDItems 333 => ' + this.selectedCafeTsd.tsdId);
    this.projectService.gettsduserdata(this.getUsersByTsdId+this.selectedCafeTsd.tsdId).then(users => this.usersbyctsd = users);
    this.clearselecteddata();
    this.getSavedData();
  }
  getSavedData(): void {
    this.projectService.getdata(this.selecteddivUrl+this.selectedCafeTsd.tsdId).then(divs => this.selecteddivisions = divs);
    this.projectService.getdata(this.selectedprotasksUrl+this.selectedCafeTsd.tsdId).then(projtasks => this.selectedprojtasks = projtasks);
    this.projectService.getdata(this.selectedpadUrl+this.selectedCafeTsd.tsdId).then(pads => this.selectedpads = pads);
    this.projectService.getdata(this.selectedadUrl+this.selectedCafeTsd.tsdId).then(ads => this.selectedads = ads);
    this.projectService.getdata(this.selectedraUrl+this.selectedCafeTsd.tsdId).then(ras => this.selectedras = ras);
    this.projectService.getdata(this.selectedpiUrl+this.selectedCafeTsd.tsdId).then(pis => this.selectedpis = pis);
  }
  clearselecteddata(): void {
    this.selecteddivisions  = [];
    this.selectedpads  = [];
    this.selectedprojtasks = [];
    this.selectedads = [];
    this.selectedras = [];
    this.selectedpis = [];
    this.usersbyctsd = [];
  }
  saveitemssize = 0;
  processsavetask( list){
    var i =0;
    var l = list.length;
    this.saveitemssize += l;
    if(list != null && l  > 0){
      console.log('in processsavetask 4444 ' + this.selectedCafeTsd.tsdId);
      this.projectService.savetasks(list , this.selectedCafeTsd );
      // .then(message => this.message = message);
    }
    list  = [];
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  errorData ='';
  savetasks( ): void {
    console.log('in save tasks');
    if((this.divTasks.length + this.projtasksTasks.length + this.adTasks.length +
      this.padTasks.length + this.raTasks.length + this.piTasks.length )== 0) {
      this.errorData = 'Please select items to save !!!';
      $('#saveModal').show();
    }
    else {
      this.istask = true;
      this.projectService.deleteTasks(this.selectedCafeTsd);
      // .then(message => this.message = message);
      this.processsavetask(this.divTasks);
      this.processsavetask(this.projtasksTasks);
      this.processsavetask(this.padTasks);
      this.processsavetask(this.adTasks);
      this.processsavetask(this.raTasks);
      this.processsavetask(this.piTasks);
      this.cleardata();
      this.getSavedData();
    }

  }
  getDataByTaskSet(){
    this.projectService.getdata(this.alldata+'/'+this.selectedCafeTsd.tsdId).then(pis => this.ctsds = pis);
  }
  addNewTaskSet(): void {
    console.log(this.tasksetname);
    this.list = [];
    this.list.push(new TaskSetModel(2017, this.tasksetname, this.userId));
    this.projectService.savetaskset(this.list)
      .then(message => {
        this.message = message;
        this.cleardata();
        this.clearselecteddata();
        this.projectService.getdata(this.availctsdUrl+'/'+this.userId).then(pis => {
          this.ctsds = pis;
        },error => {
          this.message = error.text();
        });
      });
  }

  deleteTaskSet( ): void {
    console.log('in delete tasks');
    this.projectService.deleteTaskSet( this.selectedCafeTsd )
      .then(message => {
        this.message = message;
        this.cleardata();
        this.clearselecteddata();
        this.projectService.getdata(this.availctsdUrl+'/'+this.userId).then(pis => {
          this.ctsds = pis;
        },error => {
          this.message = error.text();
        });
      });
    this.getAssiginedUserForTsdId ( this.ctsds[0] );
  }
  cleardata(): void {
    this.projTasks  = [];
    this.adTasks  = [];
    this.projtasksTasks  = [];
    // projtasksTasks
    this.divTasks = [];
    this.padTasks = [];
    this.piTasks = [];
    this.raTasks = [];
  }
  closeModal(modalName): void {
    $(modalName).hide();
  }
}
