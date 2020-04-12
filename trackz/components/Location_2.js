import React, { useState, useEffect } from 'react';
import { Platform, Text, View, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getPosition = async() => {
    await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 3,
        mayShowUserSettingsDialog: true
    },
    newLocation => {setLocation(newLocation)}
    );
  }



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    });
  });

  let text = 'Press button to start';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const renderLocation = location ? <View>
      <Text>Latitude: {location.coords.latitude}</Text>
      <Text>Longitude: {location.coords.longitude}</Text>
  </View> :
  <View></View>

  return (
    <View>
      {renderLocation}
      <Button title="Getter" onPress={() => getPosition()}/>
    </View>
  );
}