#include <string>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include "secret.h"

const char *SSID = "NalluNet";
const int BAUD_RATE = 115200;

IPAddress staticIpAddress(192, 168, 10, 101);
IPAddress gateway(192, 168, 10, 1);
IPAddress subnet(255, 255, 255, 0);

ESP8266WebServer server(80);

const int REED_SENSOR_PIN = 2;
const int DOOR_RELAY_PIN = 0;

enum DoorState
{
    Opened,
    Closed
};

void handleTriggerDoor()
{
    const String &durationWStr = server.arg("duration");
    std::string durationStr = std::string(durationWStr.c_str());
    if (!isInt(durationStr))
    {
        server.send(400, "text/plain", "invalid duration argument\r\n");
        return;
    }
    int duration = std::stoi(durationStr);
    bool result = triggerDoorImp(duration);
    if (!result)
    {
        server.send(500, "text/plain", "trigger failed\r\n");
        return;
    }
    server.send(200, "text/plain", "success\r\n");
}

void handleDoorStatus()
{
    DoorState status = getDoorStatusImp();
    if (status == DoorState::Opened)
    {
        server.send(200, "text/plain", "opened\r\n");
    }
    else
    {
        server.send(200, "text/plain", "closed\r\n");
    }
}

bool isInt(const std::string &value)
{
    if (value.length() <= 0)
    {
        return false;
    }

    for (int i = 0; i < value.length(); ++i)
    {
        char digit = value[i];
        if (digit < 0x30 || digit > 0x39)
        {
            return false;
        }
    }
    return true;
}

bool triggerDoorImp(int durationMS)
{
    digitalWrite(DOOR_RELAY_PIN, HIGH);
    delay(durationMS);
    digitalWrite(DOOR_RELAY_PIN, LOW);
    return true;
}

DoorState getDoorStatusImp()
{
    if (digitalRead(REED_SENSOR_PIN) == 0)
    {
        return DoorState::Closed;
    }
    else
    {
        return DoorState::Opened;
    }
}

void setup(void)
{
    Serial.begin(BAUD_RATE);
    pinMode(REED_SENSOR_PIN, INPUT_PULLUP);
    pinMode(DOOR_RELAY_PIN, OUTPUT);
    digitalWrite(DOOR_RELAY_PIN, LOW);
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(SSID);

    // Set a static IP Address
    bool configResult = WiFi.config(staticIpAddress, gateway, subnet);
    if (configResult == false)
    {
        Serial.println("failed to configure a static ip address");
        return;
    }

    // Connect to the wifi
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    server.on("/door/trigger", HTTP_POST, handleTriggerDoor);
    server.on("/door/status", HTTP_GET, handleDoorStatus);
    server.begin();
}

void loop(void)
{
    server.handleClient();
}
