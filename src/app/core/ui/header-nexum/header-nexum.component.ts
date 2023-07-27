import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-nexum',
  templateUrl: './header-nexum.component.html',
  styleUrls: ['./header-nexum.component.scss']
})
export class HeaderNexumComponent {

  @Input() router: string = '';
  @Input() icon: string = 'back';
  @Input() title: string = '';

}
