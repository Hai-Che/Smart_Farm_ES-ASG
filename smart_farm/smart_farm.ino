#include <Adafruit_Sensor.h>
#include "config.h"

//Include the library files
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <DHT.h>
#include <DHT_U.h>

//Initialize the LCD display
LiquidCrystal_I2C lcd(0x27, 16, 2);

DHT dht(D4, DHT11);//(DHT sensor pin,sensor type)  D4 DHT11 Temperature Sensor

//Define component pins
#define Soil A0     //A0 Soil Moisture Sensor

int relay1State = LOW;
#define RELAY_PIN_1       D3   //D3 Relay

//Create three variables for pressure
double T, P;
char status;

// set up feeds
AdafruitIO_Feed *temperature = io.feed("temp");
AdafruitIO_Feed *humidity = io.feed("humi-air");
AdafruitIO_Feed *soil = io.feed("humi-soil");
AdafruitIO_Feed *pump = io.feed("pump");

void setup() {
  Serial.begin(9600);
  lcd.begin();
  lcd.backlight();

  pinMode(RELAY_PIN_1, OUTPUT);

  dht.begin();
  // CONNECT TO ADAFRUIT SERVER
  Serial.print("Connecting to Adafruit IO");
  io.connect();

  pump->onMessage(handleMessage);
  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(io.statusText());
  
  pump->get();
  lcd.setCursor(0, 0);
  lcd.print("  Initializing ...");
  for (int a = 5; a <= 10; a++) {
    lcd.setCursor(a, 1);
    lcd.print(".");
    delay(500);
  }
  lcd.clear();
}


//Get the DHT11 sensor values
void DHT11sensor() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  //Push to adafruit
  temperature->save(t,0,0,0,2);
  humidity->save(h,0,0,0,2);

  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(t);

  lcd.setCursor(8, 0);
  lcd.print("H:");
  lcd.print(h);

}


//Get the soil moisture values
void soilMoistureSensor() {
  int value = analogRead(Soil);
  value = map(value, 0, 1024, 0, 100);
  value = (value - 100) * -1;

  soil->save(value);
  lcd.setCursor(0, 1);
  lcd.print("S:");
  lcd.print(value);
  lcd.print(" ");

}

void handleMessage(AdafruitIO_Data *data) {
  digitalWrite(RELAY_PIN_1, data->toPinLevel());
  relay1State = data->toPinLevel();
}

void loop() {
  if (relay1State == HIGH)
  {
  lcd.setCursor(10, 1);
  lcd.print("W:ON ");
  }
  else if (relay1State == LOW)
  {
    lcd.setCursor(10, 1);
    lcd.print("W:OFF");
  }

// ADAFRUIT
  io.run();
  DHT11sensor();
  soilMoistureSensor();
  delay(8000);
  }
