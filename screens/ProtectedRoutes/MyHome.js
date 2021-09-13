import React, { useContext, useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Dimensions, SafeAreaView, View, StyleSheet, Text, useColorScheme } from "react-native";
import Colors from '../../utils/colors'
import { MainContext } from './../../context';
import { Header, Footer } from '../../components'
import { Blogs } from './../../apis'
import { Section, Button } from './../../components'

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
      context.setSnackbar("Sorry! Unable to load blogs.", "error")
    }
  }

  // Works as a page resolver
  useEffect(() => {
    if (focused) {
      getBlogs();
    }
  }, [focused])
  
  return(
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingTop: 20}]}>
      <Header>Hey there!</Header>
      <View style={[styles.background, backgroundStyle]}>
        <Section title="Out Blogs">
          We currently have <Text style={styles.highlight}>{PAGE_DATA.count}</Text> blog{ (PAGE_DATA.count && PAGE_DATA.count !== 1) ? 's' : ''} uploaded in our system.
        </Section>
        <Button backgroundColor={ Colors.success } color={ Colors.dark } onPress={context.logout}>
            Logout
        </Button>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 110,
  },
  highlight: {
    fontWeight: '700'
  }
});
