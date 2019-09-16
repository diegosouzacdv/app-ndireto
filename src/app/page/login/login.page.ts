import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { CredenciaisDTO } from './../../model/usuario/CredenciaisDTO';
import { LoginGuard } from 'src/app/guards/login.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./styles/login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  login: CredenciaisDTO = {
    email: '',
    senha: ''
  };
  loading: any;

  validation_messages = {
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Digite um e-mail válido.' }
    ],
    password: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Senha mínimo 5 caracteres.' }
    ]
  };

  constructor(
    public router: Router,
    public menu: MenuController,
    private loadingController: LoadingController,
    public loginGuard: LoginGuard
    ) {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@ndireto.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
}

  ngOnInit() {
  }

  async fazerLogin() {
    await this.presentLoading();
    console.log(this.login);
    try {
      if (this.login.senha === 'admin') {
        this.loginGuard.canActivate();
      }
    } finally {
      this.loading.dismiss();
    }
  }

  public async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
