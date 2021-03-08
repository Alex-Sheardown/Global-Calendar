// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ProfilesService {
//
//   constructor() { }
// }
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';
import {Observable, of} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {LogService} from "../log.service";
import { Profile } from "../interface/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService

  ) { }

  // get(username: string): Observable<Profile> {
  //   return this.logger.get('/profiles/' + username)
  //     .map((data: {profile: Profile }) => data.profile);
  // }

}
