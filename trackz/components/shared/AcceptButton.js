import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'

const AcceptButton = (props) => {


    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container : {
        width : Dimensions.get('window').width / 10 * 3,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'black'
    },

    titleText:  {
        color: 'white',
        fontSize: 20
    }
})

export default AcceptButton