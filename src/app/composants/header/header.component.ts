import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [AuthenticationService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  user: string | null = null;

  constructor(
    @Inject(AuthenticationService)
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authenticationService.auth.onAuthStateChanged((user) => {
      this.user = user ? user.email : null;
      this.logged = !!user;
    });
  }

  deconnection() {
    console.log('deconnection');
    this.authenticationService
      .logout()
      .then(() => {
        this.logged = false;
      })
      .catch((error) => {
        console.error('Error checking if logged:', error);
      });
  }
}
