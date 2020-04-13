import React, {useState} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import Waypointer from 'components/TreazureLocation'
import Data from 'mock/data'

const TreazureRoute = () => {

    const [currentWaypoint, setCurrentWaypoint] = useState(0)

    const nextWayPoint = () => {
        console.log('Current waypoint', currentWaypoint)
        if (currentWaypoint === Data.length -1) {
            setCurrentWaypoint(0)
        } else {
            setCurrentWaypoint(currentWaypoint + 1)
        }
        
    }

    return (
        <View style={styles.screen}>
            <Text>
                This is Treasure screen
            </Text>
            <Waypointer waypoint={Data[currentWaypoint]}
                        onArrived={() => {nextWayPoint}}/>
            <Button title="Next"
                    onPress={nextWayPoint}/>
        </View>
    )

}

const styles = StyleSheet.create({

    screen : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default TreazureRoute