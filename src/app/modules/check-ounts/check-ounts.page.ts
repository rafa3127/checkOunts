import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { CheckountsService } from 'src/app/core/services/checkounts.service';


@Component({
  selector: 'app-check-ounts',
  templateUrl: './check-ounts.page.html',
  styleUrls: ['./check-ounts.page.scss'],
})
export class CheckOuntsPage implements OnInit {
  checkOunts: Array<any> = []
  user = JSON.parse(localStorage.getItem("user"))
  loading: boolean = false
  errorMSG: string | null = null
  constructor(
    public checkOuntService: CheckountsService,
    private toast: ToastController
  ) { 
  
  }

  ngOnInit() {
    this.getCheckOunts()
  }

  getCheckOunts(){
    this.loading = true
    this.checkOuntService.getCheckOunts(this.user.email).subscribe( cos => {
      this.checkOunts = cos
      this.loading = false
    }, error =>{
      this.errorMSG = "Ha ocurrido un error al cargar la lista de checkOunts"
      this.loading = false
    })
  }

  deleteCheckOunt(id: string){
    this.loading = true
    this.checkOuntService.deleteCheckOunt(id)
    .then( (res) => {
      this.toast.create({
        message: 'Se ha eliminado el checkOunt Correctamente',
        position: 'bottom',
        color: 'success',
        duration: 5000
      }).then( (toast) => {
        toast.present()
      })
      this.loading = false
    }).catch( (error) => {
      if(error == "balanceError"){
        this.toast.create({
          message: 'Su balance debe ser igual a 0 para salir de un checkOunt',
          position: 'bottom',
          color: 'danger',
          duration: 5000
        }).then( (toast) => {
          toast.present()
          this.loading = false
        })}else{
          this.toast.create({
            message: 'no se ha podido eliminar al usuario del checkOunt',
            position: 'bottom',
            color: 'danger',
            duration: 5000
          }).then( (toast) => {
            toast.present()
            this.loading = false
          })
        }
      })

    

  }


}
