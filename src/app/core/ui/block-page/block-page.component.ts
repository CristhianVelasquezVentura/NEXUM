import {Component, Input, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-block-page',
    templateUrl: './block-page.component.html',
    styleUrls: ['./block-page.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class BlockPageComponent implements OnInit {

  @Input() show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
