import { Component } from '@angular/core';
import { IDisplayList } from '../models/display-list';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  displayList: IDisplayList[] = [];

}
