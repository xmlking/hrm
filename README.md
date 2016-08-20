
Web-Bluetooth Demo: Heart Rate Service
======================================

This simple demo uses the Web-Bluetooth library to connect to a device broadcasting a Heart Rate Service characteristic and reads the heart rate.

Live Demo [https://xmlking.github.io/hrm/public/](https://xmlking.github.io/hrm/public/)

### Requirements

Web-Bluetooth is behind an experimental flag in Chrome 45+. Go to `chrome://flags/#enable-web-bluetooth` to enable the flag. Restart Chrome and you should be good to go.

Experiment with web-bluetooth on the following devices.
  * Linux      
  * ChromeOS
  * Android
  * Mac

Any Bluetooth Low Energy Heart Rate Monitor advertising the Heart Rate Service. We used the [Polar H7](http://www.amazon.com/Polar-Bluetooth-Fitness-Tracker-XX-Large/dp/B007S088F4/ref=sr_1_1?ie=UTF8&qid=1464890553&sr=8-1&keywords=polar+h7).

### Installation

First, fork this repo and then setup and run:

#### Setup

```bash
$ cd hrm
$ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
# Note that you may get error like: c.context.setKey(options.key);
# in this case you need to remove the pass:
$ openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem
# install 
$ npm install
```

#### Run

```bash
$ node server.js
$ open https://localhost:3000
```