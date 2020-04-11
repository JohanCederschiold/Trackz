import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CurrentLocation from 'components/Location'

const Home = () => {

    return (
        <View style={styles.screen}>
            <Text>
                This is home screen
            </Text>
            <CurrentLocation />
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