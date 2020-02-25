import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';


export class WebSocketAPI {
    webSocketEndPoint = 'http://localhost:8080/passbook/ws';
    topic = '/topic/setup/success';
    topicFindPrinter ='/topic/find/success';
    stompClient: any;
    appComponent: AppComponent;

    constructor(appComponent: AppComponent){
      this.appComponent = appComponent;
    }

    _connect() {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
          _this.stompClient.subscribe(_this.topicFindPrinter, function (sdkEvent) {
            _this.onFindPrinterReceived(sdkEvent);
        });
          //_this.stompClient.reconnect_delay = 2000;
      }, this.errorCallBack);
  };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error);
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message
	 */
    _send(message) {
      // stompClient.send("/app/setup", {}, JSON.stringify({'printerName': $("#printerName").val()}));
        this.stompClient.send('/app/setup', {}, JSON.stringify({printerName: message} ));
    }

    onMessageReceived(message) {
        console.log('Message Recieved from Server :: ' + message);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
        this.appComponent.handleMessage(message.body);
    }

    onFindPrinterReceived(message) {
      console.log('Message Recieved from Server :: ' + JSON.parse(message.body).printerName);
      this.appComponent.showPrinter(JSON.parse(message.body).printerName);
  }

    _print(message){
      console.log('Message Send to Print in Server :: ' + message);
      this.stompClient.send('/app/print', {}, message);
    }

    _printSerial(message){
      console.log('Message Send to Print Serial Port in Server :: ' + message);
      this.stompClient.send('/app/printserial', {}, message);
    }

    _setPrinter(message){
      console.log('Message Send Printer name to setup Printer in Server :: ' + message);
      this.stompClient.send('/app/setup', {}, JSON.stringify({printerName: message} ));
    }
    _findPrinter() {
      console.log('Message Send to find Printer in Server' );
      this.stompClient.send('/app/find', {}, {} );
    }
}
