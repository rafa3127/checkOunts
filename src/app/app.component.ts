import { Component } from '@angular/core';
import { Plugins,  } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';

const { SplashScreen, StatusBarStyle, StatusBar } = Plugins
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform
  ) {
    this.initializeApp()
  }


  initializeApp(){
    this.platform.ready().then(() =>{
      SplashScreen.hide()
      StatusBar.setBackGroundColor({color: '#f48434'})
      StatusBar.setStyle({
        style: StatusBarStyle.Light
      })
    })
  }
}
