import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
//import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
//import 'rxjs/add/operator/map'; <- professor had this but won't run at the moment.
import {Observable} from "rxjs";

@Injectable()
export class LogService {

  log(msg: any) {
    console.log(new Date() + ": " + JSON.stringify(msg));
  }


}
