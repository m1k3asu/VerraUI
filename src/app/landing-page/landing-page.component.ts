import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDisplayList } from '../models/display-list';
import { VerraService } from '../service/verra.service';
import { SubscriptionLike as ISubscription } from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  temp:any;
  countryList: string[] = [];
  selectedCountry = '';

  constructor(private verraService: VerraService) {}

  
  ngOnInit() {
 
    this.getMasterCountryList();
  }



  getMasterCountryList() {
    this.verraService.getMasterCountryList()
      .subscribe(
        (response) => {          
          console.log('response received');
          this.temp = response;
          this.extractValues(this.temp.data, "name");
        },
        (error) => {                              //Error callback
          console.error('error caught in component');
          //throw error;   //You can also throw the error to a global error handler
        }
      )
  }

  extractValues(arr: any, prop: string) {
    let extractValues = arr.map((item: { [x: string]: any; }) => item[prop]);
    // prepend ---- to the list
    Array.prototype.unshift.apply( extractValues, ["----"]);
    this.countryList = extractValues;
  } 
  selectCountryHandler(event: any) {
    this.selectedCountry =  event.target.value as string;
  }

}


