import { Injectable }    from '@angular/core';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Project } from './project';
import {ProjectTask} from './projecttask';
import {StatusRollupRenderModel} from '../taskstatus/statusrolluprendermodel';
import {TaskModel} from '../dataselector/taskmodel';
import {CafeTsdUser} from '../dataselector/CafeTsdUser';
import {TaskSetModel} from './tasksetmodel';
import {TaskstatusModel} from './taskstatus';
import { Global } from '../global/appblogal';

@Injectable()
export class ProductdetailsService {
  cafeTaskSets: Project[] = [];
  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsUrl = '/projects';  // URL to web api
  private projectsbyqUrl = '/projectsbyq';
  private savetasksurl = '/savetasks';
  private deletetasksurl='/deletetasks';
  private savetaskseturl = ' /savetaskset';
  private deletetaskseturl='/deletetaskset';
  private projectsbykey = '/getprojectsbykey/';
  private taskstausurl = '/getDataTaskStatus';
  private taskstatusrolltreedata =  Global.serviceurldomain + '/cafetaskstausrollup';
  errorData: string = "";
  searchOun: string ='ammula1';
  constructor(private http: Http) { }
  userId = 'ammula1';
  getUserId(): string {
    return this.userId;
  }

  setUserId(userid): void{
      this.userId = userid;
  }
  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }
  gettsduserdata( url): Promise<CafeTsdUser[]> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as CafeTsdUser[])
      .catch(this.handleError);
  }
  getProjdata( url): Promise<ProjectTask[]> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ProjectTask[])
      .catch(this.handleError);
  }
  getdata( url): Promise<TaskModel[]> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TaskModel[])
      .catch(this.handleError);
  }

  search(term: string): Observable<TaskModel[]> {
    console.log(' in product details service search term is => ' + term);
    return this.http
      .get(this.projectsbykey+ term)
      .map(response => response.json()  as TaskModel[]);
  }
  getProjectsBykey(query: string): Promise<ProjectTask[]> {
    return this.http.get(query)
      .toPromise()
      .then(response => response.json() as ProjectTask[])
      .catch(this.handleError);

    // return this.http
    //   .get(this.projectsbyqUrl+'/'+query )
    //   .map(result => result.json());
  }

  getProjectsByQ(query: string): Promise<Project[]> {
    return this.http.get(this.projectsbyqUrl+query)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  getDataTaskStatus(): Promise<TaskstatusModel[]>{
    return this.http.get(this.taskstausurl)
      .toPromise()
      .then(response => response.json() as TaskstatusModel[])
      .catch(this.handleError);
  }

  getTaskStatusRollupTreeData( ): Promise<StatusRollupRenderModel[]>{
    return this.http.get(this.taskstatusrolltreedata)
      .toPromise()
      .then(response => response.json() as StatusRollupRenderModel[])
      .catch(this.handleError);
  }
  savetasks( savelist  : TaskModel[],selectedTsd: TaskModel ):Promise<String> {
    console.log(selectedTsd.tsdId + ' before post call in save task in product details page. ' + savelist.length);
     return this.http.post(this.savetasksurl+ '/'+ selectedTsd.tsdId, savelist   )
      .toPromise()
      .then(response => response.toString() as String)
      .catch(this.handleError);
  }
  deleteTasks(selectedTsd: TaskModel ):  void  {
    console.log('in delete tasks in product details service');
     this.http.delete(this.deletetasksurl+'/'+selectedTsd.tsdId)
      .toPromise()
     // .then(response => response.json() as String)
      .catch(this.handleError);
  }
  savetaskset( taskset  : TaskSetModel[]  ): Promise<String> {
    console.log(taskset[0].tsdNam + ' before post call in save task set in product details page. '  );
    return this.http.post(this.savetaskseturl, taskset )
      .toPromise()
      .then(response => response.statusText +response.text() as String)
      .catch(this.handleError);
  }
  deleteTaskSet(selectedTsd: TaskModel ): Promise<String> {
    console.log('in delete tasks in product details service');
      return this.http.delete(this.deletetaskseturl+'/'+selectedTsd.tsdId)
      .toPromise()
      .then(response =>  response.statusText +response.text()  as String)
      .catch(this.handleError);
  }
  query(query: string): Observable<Project[]> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('query', query);
    const requestOptions = new RequestOptions();
    requestOptions.search = params;
    return this.http
      .get(this.projectsUrl, requestOptions)
      .map(result => result.json());
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);

  }
}


