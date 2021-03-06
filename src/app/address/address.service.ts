import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions   } from '@angular/http';
// import { AuthenticationService } from '../authguard/authentication.service';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import {Address} from './address';

import { Global } from '../global/appblogal';
@Injectable()
export class AddressService {

  private addressUrl = Global.serviceurldomain + '/address';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: Http ) {
  }
  getAddress(): Promise<Address[]> {
     return this.http
      .get(this.addressUrl )
      .toPromise()
      .then(response => response.json()  as Address[])
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error); // for demo only
    return Promise.reject(error.message || error);
  }

  // createArticle(article: Article):Observable<number> {
  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });
  //   return this.http.post(this.articleUrl, article, options)
  //     .map(success => success.status)
  //     .catch(this.handleError);
  // }
  create(address: Address): Observable<Address> {

    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    // const
    return this.http.post('http://localhost:8090/homegaurd/addaddress', JSON.stringify(address), options).map(res => res.json());

  }


  update(address: Address): Observable<Address> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    // const
    return this.http.put('http://localhost:8090/homegaurd/address', JSON.stringify(address), options).map(res => res.json());

  }

  delete(id: number): Promise<void> {
    console.log('hero.service - deleting ${id}' + id);
    const url = this.addressUrl +"/" + id;
    return this.http
      .delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
