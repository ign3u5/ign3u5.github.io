import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  links = [
    { title: 'Home', route: ''},
    { title: 'Two', route: ''}
  ];

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
