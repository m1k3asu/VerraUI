import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

}
