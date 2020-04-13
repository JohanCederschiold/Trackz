import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TreazurerRoute from 'components/TreazureRoute'

const Home = () => {

    return (
        <View style={styles.screen}>
            <TreazurerRoute />
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