import { Component, inject, Input, input } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { log } from 'console';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}

  private readonly authService = inject(AuthService)
 @Input() isLoggedIn : boolean = true
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut(){
    this.authService.logOut()
  }
}
