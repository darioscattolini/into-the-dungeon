import { Component, OnInit } from '@angular/core';
import { paths } from '../routes.paths';

@Component({
  selector: 'dungeon-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public paths = paths;

  constructor() { }

  ngOnInit(): void {
  }

}
