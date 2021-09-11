import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../utils/colors';
import { MainContext } from '../context';

export const LoadingOverlay = (props) => {
  const context = useContext(MainContext);
  const { isLoading } = context;
  const { containerStyle, children } = props;
  return (
    <View style={{ ...styles.container, containerStyle }}>
      {children}
      {
        isLoading && <View style={styles.overlay}><ActivityIndicator color={Colors.white} size={'large'} /></View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  overlay: {
    backgroundColor: Colors.black,
    opacity: 0.7,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
