import React, {useState} from 'react'
import {View, Text, Button, TextInput, StyleSheet} from 'react-native'
import Waypointer from 'components/TreazureLocation'
import Data from 'mock/data'

const TreazureRoute = () => {

    const [currentWaypoint, setCurrentWaypoint] = useState(0)
    const [currentGoal, setCurrentGoal] = useState(Data[0])
    const [arrived, setArrived] = useState(false)
    const [guess, setGuess] = useState('')

    
    const nextWayPoint = () => {
        if (currentWaypoint === Data.length -1) {
            setCurrentWaypoint(0)
            setCurrentGoal(Data[0])
        } else {
            const temporaryIndex = currentWaypoint + 1
            setCurrentWaypoint(temporaryIndex)
            setCurrentGoal(Data[temporaryIndex])
        }
        console.log("Waypoint updated", Data[currentWaypoint])
    }

    const handleArrived = () => {
        setArrived(true)
    }

    const handleTextChange = event => {
        if (event.nativeEvent.text === currentGoal.answer ) {
            handleProceed()
            setGuess('')
        } else {
            setGuess(event.nativeEvent.text)
        }
    }

    const handleProceed = () => {
        setArrived(false)
        nextWayPoint()
    }


    const renderNavigation = arrived ? <View style={styles.questionContainer}>
                                            <Text>
                                                {currentGoal.question}
                                            </Text>
                                            <TextInput  onChange={handleTextChange} 
                                                        placeholder="Skriv här"
                                                        keyboardType={currentGoal.numeric ? 'numeric' : 'default'}/>
                                        </View> 
                                    :              
                                        <Waypointer waypoint={currentGoal}
                                                    onArrive={handleArrived}/>


    


    return (
        <View style={styles.screen}>
            <View style={styles.goalcontainer}>
                <Text style={styles.goaltext}>
                    Current goal: {currentGoal.name}
                </Text>
            </View>
            {renderNavigation}
            <View style={styles.devButtons}>
                <Button title="Toggle" 
                        onPress={() => setArrived(!arrived)}/>
                <Button title="Proceed"
                        onPress={handleProceed}/>   
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    screen : {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    goaltext : {
        fontSize: 20
    },

    devButtons : {
        marginTop: 40
    },

    questionContainer : {
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default TreazureRoute