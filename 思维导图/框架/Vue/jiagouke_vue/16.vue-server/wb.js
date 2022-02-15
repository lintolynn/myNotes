  class WS {
      constructor(config) {
          this.opts = {
              url: 'localhost',
              port: 4000,
              protocol: 'ws'
          }
      }
      create() {
          this.wsc = new WebSockeVt(`${this.opts.protocol}://${this.opts.url}:${this.port}`);
          this.wsc.onopen = this.onOpen;
          this.wsc.onmessage = this.onMessage;
          this.wsc.onclose = this.onClose;
          this.wsc.onerror = this.onError
      }
      onOpen() {
          this.wsc.send(JSON.stringify({
              type: 'auth',
              message: 'Bearer '
          }))
      }
      onClose() {
          this.wsc.close()
      }
      send(msg){
          this.wsc.send(msg);
      }
      onMessage(e) {
          var obj = JSON.parse(e.data);
          switch (obj.event) {
              case 'noauth':
                  break;
              case 'heartCheck':
                  this.checkServer();
                  this.wsc.send(JSON.stringify({type:'heartBeat',data:'xxx'}))
                  break;
              default:
          }
      }
      onError() {
          setTimeout(() => {
              this.create()
          }, 1000);
      }
      checkServer(){
        clearTimeout(this.handle);
        this.handle =  setTimeout(() => {
            this.onClose();
            setTimeout(() => {
                this.create();
            }, 1000);
        }, 3000 + 1000)
            
    }
  }
  export default WS;