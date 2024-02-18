import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [AuthenticationService],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn = false;
  MyGroup!: FormGroup;
  connexionType: 'connexion' | 'inscription' = 'connexion';
  loading: boolean = false;
  shakeFailed: boolean = false;

  constructor(
    @Inject(AuthenticationService)
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.MyGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      pseudo: new FormControl(),
    });
  }
  async ngOnInit(): Promise<void> {
    if (await this.authenticationService.isLogged()) {
      console.log('already logged');
      const redirectUrl = this.authenticationService.redirectUrl || '';
      this.router.navigateByUrl(redirectUrl);
    }
  }

  ngOnDestroy() {
    this.authenticationService.cancelUserSub();
  }

  async register() {
    if (
      this.MyGroup.value.password == null ||
      this.MyGroup.value.email == null ||
      this.MyGroup.value.pseudo == null
    ) {
      this.shake();
      return;
    }
    this.loading = true;
    try {
      await lastValueFrom(
        this.authenticationService.register(
          this.MyGroup.value.email,
          this.MyGroup.value.password
        )
      );
      console.log('register success');
    } catch (error) {
      this.shake();
      alert("Erreur d'inscription, réesayez plus tard");
    } finally {
      this.loading = false;
      this.MyGroup.reset();
    }
  }

  async signIn() {
    if (
      this.MyGroup.value.password == null ||
      this.MyGroup.value.email == null
    ) {
      this.shake();
      return;
    }
    this.loading = true;
    try {
      await lastValueFrom(
        this.authenticationService.signIn(
          this.MyGroup.value.email,
          this.MyGroup.value.password
        )
      );
      console.log('login success');
    } catch (error) {
      this.shake();
      alert('Erreur de connexion');
    } finally {
      this.loading = false;
      this.MyGroup.reset();
    }
  }

  shake() {
    this.shakeFailed = true;
    console.log('register failed');
    setTimeout(() => {
      this.shakeFailed = false;
    }, 500);
  }

  switchMode() {
    if (this.connexionType == 'connexion') {
      this.connexionType = 'inscription';
    } else {
      this.connexionType = 'connexion';
    }
  }
}
