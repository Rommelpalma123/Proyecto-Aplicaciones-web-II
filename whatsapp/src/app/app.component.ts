import { Component } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url= 'http://localhost:5000/send';
  to: any;
  message: any;

  constructor(private httpClient: HttpClient) {
  }
  sendMessage(): any{

    const httpOptions =
      {
        headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
      };

    this.httpClient.post(this.url, {
      message: this.message,
      to: this.to
    }).subscribe((res)=>
    {
      console.log('mensaje enviado correctamente');
    }, (err)=>
    {
      console.log('algo salio mal al enviar su sms');
    })
  }

}
