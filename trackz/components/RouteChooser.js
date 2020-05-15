import React, {useState} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import TreazurerRoute from 'components/TreazureRoute'
import DATA from 'mock/more_data'


const RouteChooser = () => {

    const [allRoutes , setAllRoutes] = useState(DATA)
    const [chosenAdventure, setChosenAdventure] = useState()
    const [startAdventure, setStartAdventure] = useState(false)

    const handleChoose = event => {
        setChosenAdventure(event)
    }
    
    const renderAdventures = allRoutes ?  allRoutes.map(item => 
                                    <View key={item.id}>
                                        <Text onPress={() => handleChoose(item)}>{item.title}</Text>
                                    </View> 
                                    ):
                                    <Text>Laddar äventyr</Text>

    const renderChosenAdventure =  chosenAdventure ?  <View>
                                                        <Text>Du har valt:</Text>
                                                        <Text>{chosenAdventure.title}</Text>
                                                        <Button title="Bekräfta" 
                                                                onPress={() => setStartAdventure(true)}/>
                                                        <Button title="Ångra" 
                                                                onPress={() => setChosenAdventure(null)}/>
                                                    </View> 
                                                    :
                                                    <View>
                                                        <Text>Välj ett äventyr</Text>
                                                        {renderAdventures}
                                                    </View>

    const onReset = () => {
        setChosenAdventure(null)
        setStartAdventure(false)
    }






    return (
        <View style={styles.container}>
            {startAdventure ? 
                <TreazurerRoute waypoints={chosenAdventure.waypoints}
                                onReset={onReset} /> 
                : 
                renderChosenAdventure   }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center'
    },

    headline: {
        fontSize: 20
    }
})

export default RouteChooser