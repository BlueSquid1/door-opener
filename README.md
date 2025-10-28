# door-opener

This project is to control a garage door via a wireless ESP8266 micro-controller. I wrote a simple http server in golang so any device on the local wifi can control it via their web browser. Below is how it's setup:

```
garage door <---wires---- relay <---controlled via GPIO 0----- ESP8266 <-----via wifi---- http server <-----rest request----- client web browser
```

## Steps to build and flash the ESP8266
1. Download Ardunio IDE
2. Ardunio IDE -> Settings... -> 
3. in "Additional Boards manager URLs" add: "http://arduino.esp8266.com/stable/package_esp8266com_index.json"
4. Tools -> Board -> Board Manager...
5. install "esp8266"
6. Click upload button

## Steps to build the web server
```
cd server
./build.sh build
```

This will create a folder called `build` with all the server build artifacts. run `cd build ; ./doorOpener` to start the server.

