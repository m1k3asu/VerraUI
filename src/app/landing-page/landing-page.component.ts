import { Component, OnDestroy, OnInit } from '@angular/core';
import { VerraService } from '../service/verra.service';
import { SubscriptionLike as ISubscription } from "rxjs";
import { IProjectDetails } from '../models/project-details';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  temp:any;
  countryList: string[] = [];
  selectedCountry = '';
  showAddOption = true;
  projectDetails: IProjectDetails[]  = [];
  
  constructor(private verraService: VerraService) {}

  
  ngOnInit() { 
    this.getMasterCountryList();
    this.refrestDataOnToggle();
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


  getRegisteredList() {
    this.verraService.getRegisteredList()
      .subscribe(
        (response) => { 
          console.log('response received')
          this.projectDetails = response;
        },
        (error) => {  
          console.error('Request failed with error')
        },
        () => {
          //console.error('Request completed');      
        })
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

  refrestDataOnToggle() {    
    this.showAddOption = !this.showAddOption;
    if(this.showAddOption) {
      let a = 1;
    }
    else {
      this.getRegisteredList();
    }
  }

  
  addNewProject() {
    let projectName = (<HTMLInputElement>document.getElementById('projectName')).value;
    let project: IProjectDetails = {name: projectName, country: this.selectedCountry};
    this.verraService.addProjectAndCountry(project)
    .subscribe(
      (response) => {                           
        alert("Success: Added project. ProjectName:" + projectName + ", CountryName: " + this.selectedCountry);
      this.refrestDataOnToggle();      
      },
      (error) => {                              
        console.error('error caught in component')       
        alert("Error: ProjectName:" + projectName + " most likey already exists in the database");
        //throw error;   //You can also throw the error to a global error handler
      }
    )
}

}


