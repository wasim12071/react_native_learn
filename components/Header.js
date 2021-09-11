import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import Colors from './../utils/colors';

export const Header = (props) => {

    const { children, onPress } = props;

    const isDarkMode = useColorScheme() === 'dark';

    const goTo = () => {
        props.navigation.goBack();
    }

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {
                onPress && 
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.backButton}>
                        <AntIcon name="arrowleft" style={styles.backButtonIcon}/>
                    </Text>
                </TouchableOpacity>
            }
            <Text style={styles.heading}>
                {children}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    containerLight: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderBottomColor: Colors.light,
        borderBottomWidth: 1,
        color: Colors.dark,
        backgroundColor: Colors.lighter,
        display: 'flex',
        flexDirection: 'row'
    },
    containerDark: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.darker,
        borderBottomWidth: 1,
        color: Colors.lighter,
        backgroundColor: Colors.dark,
        display: 'flex',
        flexDirection: 'row'
    },
    heading: {
        fontSize: 24,
        fontWeight: '700'
    },
    backButton: {
        marginRight: 10,
        paddingTop: 5
    },
    backButtonIcon: {
        fontSize: 24,
        fontWeight: '700'
    }
  });