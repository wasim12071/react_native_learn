import React from 'react'
import {View, Text, Dimensions, StyleSheet } from 'react-native'
import Colors from './colors'

export const toastConfig = {
    
    success: ({ text1, props, ...rest }) => (
      <View style={styles.successView} >
        <Text style={ styles.text }>{text1 || "Success"}</Text>
      </View>
    ),
    error: ({ text1, props, ...rest }) => (
      <View style={styles.errorView} >
        <Text style={ styles.text }>{text1 || "Error"}</Text>
      </View>
    ),
    warning: ({ text1, props, ...rest }) => (
      <View style={ styles.warningView } >
        <Text style={ styles.text }>{text1 || "Warning"}</Text>
      </View>
    ),
  };


const styles = StyleSheet.create({
  successView: { 
    flex: 1, 
    width: '90%', 
    height: 50, 
    backgroundColor: Colors.success, 
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
  errorView: { 
    flex: 1, 
    width: '90%', 
    minHeight: 50, 
    backgroundColor: Colors.error, 
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
  warningView: { 
    flex: 1, 
    width: '90%', 
    height: 50, 
    backgroundColor: Colors.warning, 
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
    color: Colors.darker
  }
});