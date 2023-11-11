import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'workflow-step-details',
  templateUrl: 'workflow-step-details.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class WorkflowStepDetailsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
