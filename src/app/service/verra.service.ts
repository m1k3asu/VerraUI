import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProjectDetails } from '../models/project-details';

@Injectable({
  providedIn: 'root'
})
export class VerraService {

  baseApiUrl = "https://localhost:7268/";
  countryUrl = "https://countriesnow.space/api/v0.1/countries/states";

  constructor(private http: HttpClient) { }

  getMasterCountryList() {
    return this.http.get(this.countryUrl);             
  }

  getRegisteredList(): Observable<any> {
    return this.http.get(this.baseApiUrl + "api/Verra/GetRegisteredList")
  }

  private getHeaders() {
    const headers = new HttpHeaders().set('ContentType', 'application/json');  
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS, DELETE");
    headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, X-Requested-With, Content-Type, Accept");
    return headers;
  }

  addProjectAndCountry(projectDetail: IProjectDetails): Observable<any> {
    const headers = this.getHeaders();       
    return this.http.post<any>(this.baseApiUrl + "api/Verra/AddProject", projectDetail,{ headers: headers});
  }

}
