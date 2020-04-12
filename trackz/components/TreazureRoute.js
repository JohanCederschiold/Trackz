import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CurrentLocation from 'components/TreazureLocation'

const TreazureRoute = () => {

    return (
        <View style={styles.screen}>
            <Text>
                This is Treasure screen
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

export default TreazureRoute