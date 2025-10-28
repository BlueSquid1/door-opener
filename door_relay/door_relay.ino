# include <string>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include "secret.h"

const char* SSID = "NalluNet";
const int BAUD_RATE = 115200;

IPAddress staticIpAddress(192, 168, 10, 100);
IPAddress gateway(192, 168, 10, 1);
IPAddress subnet(255, 255, 255, 0);

ESP8266WebServer server(80);

const int LED_PIN = 2;
const int RELAY_PIN = 0;

void handleTrigger() {
  digitalWrite(LED_PIN, LOW);
  const String& durationWStr = server.arg("duration");
  std::string durationStr = std::string(durationWStr.c_str());
  if ( !isInt(durationStr) ) {
    server.send(400, "text/plain", "invalid duration argument\r\n");
    return;
  }
  int duration = std::stoi(durationStr);
  bool result = triggerImp(duration);
  if ( !result ) {
    server.send(500, "text/plain", "trigger failed\r\n");
    return;
  }
  server.send(200, "text/plain", "success\r\n");
  digitalWrite(LED_PIN, HIGH);
}

bool isInt(const std::string& value) {
  if ( value.length() <= 0 ) {
    return false;
  }

  for (int i = 0; i < value.length(); ++i) {
    char digit = value[i];
    if ( digit < 0x30 || digit > 0x39 ) {
      return false;
    }
  }
  return true;
}

bool triggerImp(int durationMS) {
  digitalWrite(RELAY_PIN, HIGH);
  delay(durationMS);
  digitalWrite(RELAY_PIN, LOW);
  return true;
}

void setup(void) {
  Serial.begin(BAUD_RATE);
  pinMode(LED_PIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);
  digitalWrite(RELAY_PIN, LOW);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(SSID);

  // Set a static IP Address
  bool configResult = WiFi.config(staticIpAddress, gateway, subnet);
  if( configResult == false ) {
    Serial.println("failed to configure a static ip address");
    digitalWrite(LED_PIN, LOW);
    return;
  }

  // Connect to the wifi
  bool ledState = true;
  digitalWrite(LED_PIN, ledState);
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    ledState = !ledState;
    digitalWrite(LED_PIN, ledState);
    delay(500);
    Serial.print(".");
  }
  digitalWrite(LED_PIN, HIGH);
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/trigger", HTTP_POST, handleTrigger);
  server.begin();
}

void loop(void) {
  server.handleClient();
}
