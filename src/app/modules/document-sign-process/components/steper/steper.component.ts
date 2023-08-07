import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.scss']
})
export class SteperComponent implements OnInit {

  @Input() steper: string[] = ['d','d','d','d'];
  @Input() title: string = '';
  @Input() subtitle: string = '';
  //d - default, f - focus, s - success

  constructor() { }

  ngOnInit(): void {
  }

}
