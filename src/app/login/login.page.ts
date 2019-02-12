import { Component } from '@angular/core';
import { Connection } from '../../routes/connection'
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private routes: Connection,
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) { }

  userCPF: String
  password: String
  signInEvent: Boolean = false
  signInCPF: String
  signInPassword: String
  signInUniqueKey: String
  signInEmail: String

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'crescent',
      duration: 1500
    })
    loading.present()
    let user = {
      userCPF: this.userCPF,
      password: this.password
    }
    this.routes.login(user).subscribe(async resp => {
      console.log(resp)
      await loading.dismiss()
      this.alertShowUp('Success', resp.message, 'OK')
      this.navCtrl.navigateForward('/tabs')

    }, async err => {
      await loading.dismiss()
      this.alertShowUp('Error', err.message, 'OK')
      console.log(err)
    })
  }

  async signIn() {

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'crescent',
      duration: 1500
    })
    loading.present()

    let form = {
      userCPF: this.signInCPF,
      password: this.signInPassword,
      email: this.signInEmail,
      uniqueKey: this.signInUniqueKey
    }

    this.routes.signIn(form).subscribe(async resp => {
      await loading.dismiss()
      this.alertShowUp('Success', resp.message, 'OK')
      form.userCPF, form.password, form.email, form.uniqueKey = ""
      this.signInEvent = false
    }, async err => {
      await loading.dismiss()
      if (err.message == undefined) {
        return this.alertShowUp('Error', err, 'OK')
      }
      let pos = err.message.search("failed:")
      if (pos !== -1) {
        let fabric_ca_error = err.message.substring(pos, err.message.lastIndexOf("}") - 1)
        return this.alertShowUp('Error', fabric_ca_error, 'OK')
      }
      return this.alertShowUp('Error', err.message, 'OK')
    })
  }

  async alertShowUp(header, message, button) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [button]
    })
    return await alert.present();
  }


}
