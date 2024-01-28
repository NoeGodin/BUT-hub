import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthenticationService],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit{
  logged: boolean = false;
  scoreTetris!: number | undefined;
  constructor(private router: Router,@Inject(AuthenticationService) private authenticationService: AuthenticationService, private userService: UsersService) {}
  
    async ngOnInit(): Promise<void> {
      if (await this.authenticationService.isLogged()) {
        this.logged = true;
        const userId = await this.authenticationService.getUserId();
        if (userId == null) {
          console.log("bug curieux mdr");
        } else {
          this.userService.UserById(userId).subscribe(user => {
            if (user) {
              this.scoreTetris = user?.games.tetris.score;
            }
          });
        }
      }
    }

    playTetris(){
      this.router.navigateByUrl('jeux/tetris');
    }
  }
