import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, StyleSheet, PermissionsAndroid } from 'react-native'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import * as Permissions from 'expo-permissions'
//import Data from 'mock/data'

export default function TreazureLocation(props) {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [distance, setDistance] = useState(null)

  const {waypoint, onArrived} = props

  const getPosition = async() => {
    await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 3,
        mayShowUserSettingsDialog: true
    },
    newLocation => {
        setLocation(newLocation)
        const currentPosition = {
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude
        }
        const distance = getDistance(currentPosition, waypoint)
        setDistance(distance)
        if (distance < 50 ) {
          onArrived()
        }
        console.log(distance)
      }
    )
  }

  useEffect( () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    getPosition()
  }, []);

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

  const renderDistance = distance ? 
                        <View>
                          <Text>
                            {distance} meter
                          </Text>
                        </View> 
                        :
                        <View>
                          <Text>Awaiting position</Text>
                        </View>

  return (
    <View>
      {renderDistance}
      <Button title="Getter" onPress={() => getPosition()}/>
    </View>
  );
}