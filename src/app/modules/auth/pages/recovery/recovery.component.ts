import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class RecoveryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
