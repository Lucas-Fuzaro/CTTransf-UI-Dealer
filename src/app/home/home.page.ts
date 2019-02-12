import { Component } from '@angular/core';

@Component({
  selector: 'home-app',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor() { }
  user = "Kalvin"
  mock = [{name: 'Joao', plate: 'ABC1234', status: 'Done'}, {name: 'Maria', plate: 'FFF1234', status: 'Ongoing'}, {name: 'José', plate: 'PPP0000', status: 'Ongoing'}, {name: 'Gustavo', plate: 'CCC4444', status: 'Denied'}]

  // sort(col){
  //   switch(col){
  //     case 'customer':

  //   }
  // }

}
