import React from 'react'
import {View, Text, Dimensions, StyleSheet, useColorScheme } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Colors from './colors'

export const toastConfig = {

    
    success: ({ text1, props, ...rest }) => (
      <View style={[ styles.view, { backgroundColor: Colors.white } ]} >
        <AntIcon name="checkcircle" style={{ color: Colors.success }} size={25}/>
        <Text style={ styles.text }>{text1 || "Success"}</Text>
      </View>
    ),
    error: ({ text1, props, ...rest }) => (
      <View style={[ styles.view, { backgroundColor: Colors.white } ]} >
        <AntIcon name="closecircle" style={{ color: Colors.error }} size={25}/>
        <Text style={ styles.text }>{text1 || "Error"}</Text>
      </View>
    ),
    warning: ({ text1, props, ...rest }) => (
      <View style={[ styles.view, { backgroundColor: Colors.white } ]} >
        <AntIcon name="exclamationcircle" style={{ color: Colors.warning }} size={25}/>
        <Text style={ styles.text }>{text1 || "Warning"}</Text>
      </View>
    ),
  };


const styles = StyleSheet.create({
  view: { 
    flex: 1, 
    width: '95%', 
    minHeight: 45,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: Dimensions.get('window').height/30,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3.65,
  },
  text: {
    marginLeft: 10,
    color: Colors.darker
  }
});