import React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';

const Task = (props) => {
    return(
        <View style = {styles.items}>
            <View style = {styles.itemsLeft}>
                <View style = {styles.square}></View>
                <Text style = {styles.itemText}>{props.text}</Text>
            </View>
            <View style = {styles.circular}>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circular : {
        width : 12,
        height : 12,
        borderColor : '#55BCF6',
        borderWidth : 2,
        borderRadius : 5,
    },
    itemText : {},
    square : {
        width : 24,
        height : 24,
        backgroundColor : '#55BCF6',
        opacity : 0.4,
        borderRadius : 5,
        marginRight : 15,
    },
    itemsLeft : {
        flexDirection : 'row',
        alignItems : 'center',
        flexWrap : 'wrap',
    },
    items : {
        backgroundColor : '#FFF',
        padding : 15,
        borderRadius : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom : 20,
    },
});




export default Task;