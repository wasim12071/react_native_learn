import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign'
import Colors from './../utils/colors'

export const MyTabBar = ({ state, navigation }) => {

    const isDarkMode = useColorScheme() === 'dark';

    const names = {
        "MyHome": {
            label: "Home",
            icon: "home"
        },
        "MyProfile": {
            label: "Profile",
            icon: "user"
        }
    }

    const isActive = (index) => {
        return state.index === index
    }

    const onPress = (route, index) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isActive(index) && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
        }
    };

    return (
        <View style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode}>
        {
            state.routes.map((route, index) => {
                return (
                    <TouchableOpacity accessibilityRole="button" onPress={ () => onPress (route, index) } style={styles.button} >
                        <Text style={[ styles.buttonContent, (isActive(index) ? styles.focused : styles.unFocused), styles.icon, { color: isDarkMode ? Colors.white : Colors.dark }]}>
                            <AntIcon name={names[route.name].icon || 'question'} style={[ (isActive(index) ? styles.focused : styles.unFocused), { color: isDarkMode ? Colors.white : Colors.dark } ]} size={16}/>
                        </Text>
                        <Text style={[ styles.buttonContent, (isActive(index) ? styles.focused : styles.unFocused), { color: isDarkMode ? Colors.white : Colors.dark }]}>
                            { names[route.name].label || route.name }
                        </Text>
                    </TouchableOpacity>
                );
            })
        }
        </View>
    );
}


const styles = StyleSheet.create({
    containerLightMode: {
        flexDirection: 'row',
        backgroundColor: Colors.lighter,
        color: Colors.dark,
        borderTopColor: Colors.light,
        borderTopWidth: 1
    },
    containerDarkMode: {
        flexDirection: 'row',
        backgroundColor: Colors.dark,
        color: Colors.white,
        borderTopColor: Colors.darker,
        borderTopWidth: 1
    },
    button: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonContent: {
        textAlign: 'center',
        fontSize: 16
    },
    icon: {
        marginBottom: 5
    },
    focused: {
        fontWeight: '700',
    }, 
    unFocused: {
        fontWeight: '300'
    }
});