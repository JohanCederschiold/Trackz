import React, {useState} from 'react'
import {View, Text, Button, TextInput, StyleSheet, Dimensions} from 'react-native'
import Waypointer from 'components/TreazureLocation'

const TreazureRoute = ({waypoints, onReset}) => {

    console.log(waypoints[0])


    const [currentWaypoint, setCurrentWaypoint] = useState(0)
    const [currentGoal, setCurrentGoal] = useState(waypoints[0])
    const [arrived, setArrived] = useState(false)
    const [allComplete, setAllComplete] = useState(false)
    const [guess, setGuess] = useState('')

    
    const nextWayPoint = () => {
        if (currentWaypoint === waypoints.length -1) {
            //setCurrentWaypoint(0)
            //(waypoints[0])
            setAllComplete(true)
        } else {
            const temporaryIndex = currentWaypoint + 1
            setCurrentWaypoint(temporaryIndex)
            setCurrentGoal(waypoints[temporaryIndex])
        }
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
                                    <View style={styles.goalcontainer}>
                                         <Text style={styles.goaltext}>
                                                {currentGoal.name}
                                        </Text>
                                        <Waypointer waypoint={currentGoal}
                                                        onArrive={handleArrived}/>
                                    </View>           

    const renderGameWon = <View>
                            <Text style={styles.headline}>
                                Grattis!!!
                            </Text>
                            <Text>
                                Du har klarat spelet. Bra jobbat!
                            </Text>
                            <Button title="Fortsätt"
                                    onPress={onReset} />
                        </View>


    


    return (
        <View style={styles.screen}>
            {allComplete ? renderGameWon : renderNavigation}
            <View style={styles.devButtons}>
                <Button title="Toggle" 
                        onPress={() => setArrived(!arrived)}/>
                <Button title="Proceed"
                        onPress={handleProceed}/>   
                <Button title="Reset"
                        onPress={onReset}/>   
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
        fontSize: 20,
        color: 'white',
        paddingVertical: 10
    },

    goalcontainer : {
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 20,
        backgroundColor: 'black',
        width: Dimensions.get('window').width / 10 * 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    headline: {
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