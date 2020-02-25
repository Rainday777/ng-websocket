import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  greeting: any;
  printerName: string;
  printArray: Array<any> =  new Array();


  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this);
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.printerName);
  }

  sendPrinter() {
    console.log('printerName :' + this.printerName);
    this.webSocketAPI._setPrinter(this.printerName);
  }

  findPrinter() {
    this.webSocketAPI._findPrinter();
  }

  testPrintSerial() {
    const linesPrint = new Array();
	   for ( let i = 0; i < 24; i++ ) {
      linesPrint[i] = 'Line Line Line Line Line Line Line Line Line ' + i;

    }
    const printMess = JSON.stringify(
      {copies: 1,
       header1: '',
       header2: '',
       branch: 'แจ้งวัฒนะ' ,
       accountNo: '1234-4567-90',
       holderName: 'นายรักประเทศไทย รักชาตื',
       holderAddress1: '123/456 ข 789',
       holderAddress2: 'thailand',
       holderAddress3: 'Bangkok',
       printCoverPage: 'false',
       lines: linesPrint,
       paperSize: {
         width: '5.0in',
         height: '7.0in',
         autoResize: 'true'
         }
      }
      );

      this.webSocketAPI._printSerial(printMess);
  }

  printTest() {
    const linesPrint = new Array();
	   for ( let i = 0; i < 24; i++ ) {
      linesPrint[i] = 'Line Line Line Line Line Line Line Line Line ' + i;

    }
    const printMess = JSON.stringify(
      {copies: 1,
       header1: '',
       header2: '',
       branch: 'แจ้งวัฒนะ' ,
       accountNo: '1234-4567-90',
       holderName: 'นายรักประเทศไทย รักชาตื',
       holderAddress1: '123/456 ข 789',
       holderAddress2: 'thailand',
       holderAddress3: 'Bangkok',
       printCoverPage: 'false',
       lines: linesPrint,
       paperSize: {
         width: '5.0in',
         height: '7.0in',
         autoResize: 'true'
         }
      }
      );

      this.webSocketAPI._print(printMess);
  }

  handleMessage(message) {
    const _message = JSON.parse(message);
    console.log('handle message:' + _message);
    if (_message.printerName) {
      this.greeting = _message.printerName;
    } else {
      this.greeting = 'this  printer name  Not Found';
    }

    console.log('this.greeting:' + this.greeting);
  }

  showPrinter(message) {
    console.log('showPrinter message:' + message);
    this.printArray.push(message);
  }
}
