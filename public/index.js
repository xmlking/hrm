class HeartRateMonitor {
  constructor() {
    this.SERVICE_ID = 0x180D;
    this.CHARACTERISTIC_ID = 0x2A37;
    
    this.hrElement_ = document.getElementById('hr');
    this.avgElement_ = document.getElementById('avg');
    
    this.resetAverage_();
  }

  computeAverage_() {
    if (this.timeSum_ > 0) {
      let avg = this.hrSum_ / ((this.timeSum_) * 2);
      return avg.toFixed(1);
    }
    return '0.0';
  }

  resetAverage_() {
    this.lastTick_ = 0;
    this.lastHr_ = 0;
    this.hrSum_ = 0;
    this.timeSum_ = 0;
  }
  
  parseHeartRate_(data) {
    let flags = data.getUint8(0);
    if (flags & 0x1) {
      return data.getUint16(1, true);
    }
    return data.getUint8(1);
  }

  onHeartRateChanged_(event) {
    console.log(event);
    let dataView =  event.target.value;
    let tick = (new Date()).getTime();
    let hr = this.parseHeartRate_(dataView);
    
    // Ignore readings where the HR or last HR value is 0 - treat this as a
    // failed reading from the sensor.
    if (this.lastTick_ && hr && this.lastHr_) {
      this.hrSum_ += (tick - this.lastTick_) * (hr + this.lastHr_);
      this.timeSum_ += tick - this.lastTick_;
    }
    this.lastTick_ = tick;
    this.lastHr_ = hr;
    
    this.hrElement_.textContent = hr;
    this.avgElement_.textContent = this.computeAverage_();
  }

  handleCharacteristic_(characteristic) {
    characteristic.addEventListener('characteristicvaluechanged',
        event => this.onHeartRateChanged_(event));
    return characteristic.startNotifications();
  }

  start() {
    this.resetAverage_();
    let options = {filters: [{
      services: [this.SERVICE_ID],
      namePrefix: 'Polar H7'
    }]};
    navigator.bluetooth.requestDevice(options)
        .then(device => {
          return device.gatt.connect();
        })
        .then(server => {
          return server.getPrimaryService(this.SERVICE_ID);
        })
        .then(service => {
          return service.getCharacteristic(this.CHARACTERISTIC_ID);
        })
        .then(characteristic => this.handleCharacteristic_(characteristic))
        .catch(error => {
          console.log('Error: ' + error);
        });
  }
}