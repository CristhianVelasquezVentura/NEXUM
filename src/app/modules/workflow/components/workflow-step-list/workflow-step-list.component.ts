import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'workflow-step-list',
  templateUrl: 'workflow-step-list.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class WorkflowStepListComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
