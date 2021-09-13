import React, { useContext, useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Dimensions, SafeAreaView, View, StyleSheet, Text, useColorScheme } from "react-native";
import Colors from '../../utils/colors'
import { MainContext } from './../../context';
import { Header } from '../../components'
import { Blogs } from './../../apis'
import { Section, Button } from './../../components'
import Dialog from "react-native-dialog";

export const MyHome = (props) => {

  const context = useContext(MainContext);
  const isDarkMode = useColorScheme() === 'dark';
  const focused = useIsFocused();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.white : Colors.darker,
  };

  const [PAGE_DATA, setOnLoad] = useState({});

  // get all the blogs when the page loads
  const getBlogs = async () => {
    try {
      context.setIsLoading(true);
      const response = await Blogs.getBlogs();
      if(response.success) {
        context.setIsLoading(false);
        setOnLoad({ blogs: response.data.blogs, count: response.data.blogs.length });
      } else {
        context.setIsLoading(false);
        throw(response);
      }
    } catch (error) {
      context.setIsLoading(false);
      context.setSnackbar("Sorry! Unable to load Home. Please Logout.", "error")
    }
  }

  // Works as a page resolver
  useEffect(() => {
    if (focused) {
      getBlogs();
    }
  }, [focused])

  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    context.logout();
    setVisible(false);
  };
  
  return(
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingTop: 20}]}>
      <Header>Home</Header>
      <View style={[styles.background, backgroundStyle]}>
        <Section title="Welcome!">
          <Text style={styles.highlight}>{PAGE_DATA.count}</Text> blog{ (PAGE_DATA.count && PAGE_DATA.count !== 1) ? 's' : ''} uploaded in our system.
        </Section>
        <Button backgroundColor={ Colors.success } color={ Colors.dark } onPress={showDialog}>
            Logout Now
        </Button>
      </View>
      <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
        <Dialog.Title>Logout Now</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to logout?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Logout" onPress={handleDelete} />
      </Dialog.Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  highlight: {
    fontWeight: '700',
    fontSize: 20
  }
});
