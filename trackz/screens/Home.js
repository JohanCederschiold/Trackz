import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TreazurerRoute from 'components/TreazureRoute'
import RouteChooser from 'components/RouteChooser'

const Home = () => {

    return (
        <View style={styles.screen}>
            <RouteChooser />
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

export default Home