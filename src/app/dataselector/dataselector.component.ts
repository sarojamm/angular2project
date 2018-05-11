import { Component, OnInit,OnChanges,SimpleChanges, Input,Output  , EventEmitter } from '@angular/core';

import { DataselectorService } from './dataselector.service';
import { ProductdetailsService } from '../taskstatus/productdetails.service';
import {TaskModel} from './taskmodel';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-dataselector',
  templateUrl: './dataselector.component.html',
  styleUrls: ['./dataselector.component.css'],
  providers: [DataselectorService, ProductdetailsService]

})

export class DataselectorComponent implements OnInit,OnChanges {

  private subject: Subject<string> = new Subject();
  @Input() title1 :String;
  @Input() tsdid :number;
  @Input() isproject :boolean;
  @Input() filteredItems: TaskModel[];
  @Input() inassignedItems:  EventEmitter<TaskModel[]> = new EventEmitter();
  @Output() projTasks : EventEmitter<TaskModel[]> = new EventEmitter();

  newtasks: TaskModel[] = [];
  selectedProject: TaskModel  ;
  title = 'New Cafe';
  filterKey='';
  filterProject:string ="a";
  allItems:  TaskModel[] =[];
  selectedItems:  TaskModel[] =[];
  selectedAssignedItems:  TaskModel[] =[];
  allprojects : TaskModel[] =[];
  assignedItems:  TaskModel[] =[];
  subtitle = 'pad: operations , business';

  toggleMenu: boolean = false;
  toggleAssignedMenu: boolean = false;
  constructor(private projectService: ProductdetailsService) {
     this.projTasks.emit(this.newtasks);
     this.inassignedItems.emit(this.assignedItems);
  }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
    //   let change = changes[propName];
    //   let curVal  = JSON.stringify(change.currentValue);
    //   let prevVal = JSON.stringify(change.previousValue);
      if (propName === 'filteredItems') {
        if(this.allItems.length == 0 ){
          for (let item in this.filteredItems) {
            this.allItems.push(this.filteredItems[item]);
            this.allprojects.push(this.filteredItems[item]);
          }
        }
      }
      if (propName === 'inassignedItems') {
         this.selectedItems=[];
         for (let item in this.inassignedItems){
             this.selectedItems.push(this.inassignedItems[item]);
         }
        this.assignedItems=[];
        this.moveToAssignedItems();
      }
    }
  }
  ngOnInit(): void {
    console.log( " length of filtereditems " + this.filteredItems.length);
    // this.subject.debounceTime(500)
    //   .distinctUntilChanged()
    //   .subscribe(searchTextValue => { this.getProjectsByQ(searchTextValue);})
    // ;

    for (let item in this.filteredItems) {
      this.allItems.push(this.filteredItems[item]);
      this.allprojects.push(this.filteredItems[item]);
    }
    this.selectedProject = this.filteredItems[0];
    //console.log(this.selectedProject.tsdId);

  }
  sortByProjTaskNam(a, b) :number {
    if (a.tsdNam < b.tsdNam) {
      return -1;
    }
    if (a.tsdNam > b.tsdNam) {
      return 1;
    }
    return 0;
  };
  addAllItemsToSelectedAssignedItems(){
    this.toggleAssignedMenu = !this.toggleAssignedMenu;
    while(this.selectedAssignedItems.length > 0) this.selectedAssignedItems.pop();
    if (this.toggleAssignedMenu ){
      for (let project in this.assignedItems) {
        this.selectedAssignedItems.push(this.assignedItems[project]);
      }
    }
  }
  addAllItemsToSelected() {
    this.toggleMenu = !this.toggleMenu;
    while(this.selectedItems.length > 0) this.selectedItems.pop();
    if (this.toggleMenu ) {
      for (let project in this.allItems) {
        this.selectedItems.push(this.allItems[project]);
      }
    }
  }
  removeAllItemsToSelected(){
    console.log("removeAllItemsToSelected => ");
  }
  addToSelectedItems(row){
    this.selectedItems = this.additem(row, this.selectedItems) ;
  }
  additem(row, list) : TaskModel[]{
    let result  = list.filter(
      e =>   e.tsdNam === row.tsdNam
    );
    if (result.length > 0 ){
      list = list.filter(
        e =>   e.tsdNam !== row.tsdNam
      );
    }
    else
      list.push(row);
    return list;
  }
  addToSelectedAssignedItems(row){
    let result  = this.selectedAssignedItems.filter(
      e =>   e.tsdNam === row.tsdNam
    );
    if (result.length > 0 ){
      this.selectedAssignedItems = this.selectedAssignedItems.filter(
        e =>   e.tsdNam !== row.tsdNam
      );
    }
    else
      this.selectedAssignedItems.push(row);

  }
  moveToAssignedItems(){
    for (let project in this.selectedItems) {
      this.assignedItems.push(this.selectedItems[project]);
      this.filteredItems = this.filteredItems.filter(
        e =>   e.tsdNam !== this.selectedItems[project].tsdNam
      );
    }
    this.assignedItems.sort(this.sortByProjTaskNam);
    this.filteredItems.sort(this.sortByProjTaskNam);
    this.processSelectedProject();
    while(this.selectedItems.length > 0) this.selectedItems.pop();
  }
  moveToAvailableItems(){
    for (let project in this.selectedAssignedItems) {
      this.filteredItems.push(this.selectedAssignedItems[project]);
      this.assignedItems = this.assignedItems.filter(
        e =>   e.tsdNam !== this.selectedAssignedItems[project].tsdNam
      );
    }
    this.assignedItems.sort(this.sortByProjTaskNam);
    this.filteredItems.sort(this.sortByProjTaskNam);

    while(this.selectedAssignedItems.length > 0) this.selectedAssignedItems.pop();
    this.processSelectedProject();

  }
  processSelectedProject( ) {
    this.newtasks = [];
    for (let task in this.assignedItems){
      let taskobj =  this.assignedItems[task];
      //console.log("moveToAvailableItems => " + taskobj.ldgPrdDescYrNo +" => " + taskobj.tsdNam + taskobj.tsdNam)
        this.newtasks.push({
          ldgPrdDescYrNo: taskobj.ldgPrdDescYrNo,
          fltrTypId: taskobj.fltrTypId,
          fltrId :  taskobj.fltrId,
          tsdId: this.tsdid,
          tsdNam: taskobj.tsdNam
        });
       this.projTasks.emit(this.newtasks);
    }
  }

}
