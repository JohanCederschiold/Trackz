import React, {useState} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import Waypointer from 'components/TreazureLocation'
import Data from 'mock/data'

const TreazureRoute = () => {

    const [currentWaypoint, setCurrentWaypoint] = useState(0)
    const [currentGoal, setCurrentGoal] = useState(Data[0])
    const [arrived, setArrived] = useState(false)

    
    const nextWayPoint = () => {
        if (currentWaypoint === Data.length -1) {
            setCurrentWaypoint(0)
            setCurrentGoal(Data[0])
        } else {
            setCurrentWaypoint(currentWaypoint + 1)
            setCurrentGoal(Data[currentWaypoint + 1])
        }
        console.log("Waypoint updated", Data[currentWaypoint])
    }

    const handleArrived = () => {
        setArrived(true)
    }

    const handleProceed = () => {
        setArrived(false)
        nextWayPoint()
    }


    const renderNavigation = arrived ? <View>
                                            <Button title="Proceed"
                                                    onPress={handleProceed}/>
                                        </View> 
                                    :              
                                        <Waypointer waypoint={currentGoal}
                                                    onArrive={handleArrived}/>


    


    return (
        <View style={styles.screen}>
            <Text>
                This is Treasure screen, {currentGoal.name}
            </Text>
            {renderNavigation}
            <Button title="Manuell switch" 
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