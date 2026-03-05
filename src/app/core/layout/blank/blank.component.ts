import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css',
})
export class BlankComponent {

}
