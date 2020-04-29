import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, StyleSheet, Alert } from 'react-native'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import * as Permissions from 'expo-permissions'

export default function TreazureLocation(props) {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [distance, setDistance] = useState(null)
  const [time, setTime] = useState(Date.now())

  const {waypoint, onArrive} = props

  
  const getPosition = async() => {

    const newLocation = await Location.getCurrentPositionAsync({})
    //console.log(newLocation)
    setLocation(newLocation)
    calculateDistance()
  }

  const calculateDistance = () => {
    if (location) {
      const currentPosition = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      const currentDistance = getDistance(currentPosition, waypoint)
      if (currentDistance < 15) {
        onArrive()
      } else {
        setDistance(getDistance(currentPosition, waypoint))
      }
    }
  }

  useEffect(() => {

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    })()

    const interval = setInterval(() => {
      getPosition()
      setTime(Date.now())
    }, 5000)
    return () => clearInterval(interval)
  }, [time])


  if (errorMsg) {
    console.log(errorMsg)
  } 

  const renderDistance = distance ? 
                        <View key={distance}>
                          <Text>
                            {waypoint.name}
                          </Text>
                          <Text>
                            {distance} meter
                          </Text>
                        </View> 
                        :
                        <View>
                          <Text>Hämtar position</Text>
                        </View>

  return (
    <View>
      {renderDistance}
    </View>
  );
}