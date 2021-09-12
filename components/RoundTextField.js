import React from 'react';
import { TextInput, StyleSheet, useColorScheme, View, Text } from 'react-native';
import Colors from '../utils/colors';

export const RoundTextField = (props) => {
  const { placeholder, onChange, value, hideLabel, style, ...rest } = props;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.formControl}>
      {
        !hideLabel && <Text style={[styles.label, { color: isDarkMode ? Colors.white : Colors.light }]}>{placeholder}</Text>
      }
      <TextInput
        style={[styles.textInput, style]}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    marginVertical: 5
  },
  label: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    margin: 5,
    marginLeft: 20
  },
  textInput: {
    height: 50,
    minWidth: 215,
    borderRadius: 50,
    color: Colors.dark,
    backgroundColor: Colors.white,
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
    paddingHorizontal: 20,
    margin: 5,
    elevation: 10,
    shadowColor: Colors.darker,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3.65,
  }
});
