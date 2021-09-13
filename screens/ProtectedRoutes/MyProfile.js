import React, { useContext, useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Dimensions, SafeAreaView, View, StyleSheet, Text, useColorScheme, Image, RefreshControl, ScrollView } from "react-native";
import Colors from '../../utils/colors'
import { MainContext } from './../../context';
import { Header } from '../../components'
import { Authenticate } from './../../apis'

export const MyProfile = (props) => {

  const context = useContext(MainContext);
  const isDarkMode = useColorScheme() === 'dark';
  const focused = useIsFocused();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.white : Colors.darker,
  };

  const [PAGE_DATA, setOnLoad] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // get all the blogs when the page loads
  const getBlogs = async (showLoader = true) => {
    try {
      showLoader ? context.setIsLoading(true) : null;
      const response = await Authenticate.getUser({ token: context.auth.token });
      if(response.success) {
        showLoader ? context.setIsLoading(false) : null;
        setOnLoad(response.data);
      } else {
        showLoader ? context.setIsLoading(false) : null;
        throw(response);
      }
    } catch (error) {
      showLoader ? context.setIsLoading(false) : null;
      context.setSnackbar("Sorry! Unable to load your profile.", "error")
    }
  }

  // Works as a page resolver
  useEffect(async () => {
    if (focused && !PAGE_DATA.user) {
      await getBlogs(true);
    }
  }, [focused])

  const onRefreshing = React.useCallback(async () => {
    setRefreshing(true);
    await getBlogs(false);
    setRefreshing(false);
  },[])
  
  return(
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingTop: 20 }]}>
      <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} /> }>
        <Header>{PAGE_DATA.user ? PAGE_DATA.user.firstName : ''} {PAGE_DATA.user ? PAGE_DATA.user.lastName : ''}</Header>
        <View style={[styles.background, backgroundStyle]}>
          {
            PAGE_DATA.userDetails && PAGE_DATA.userDetails.imgUrl && <Image source={{ uri: PAGE_DATA.userDetails.imgUrl}} style={[styles.image, { borderColor: isDarkMode ? Colors.lighter : Colors.dark }]} />
          }
          {
            PAGE_DATA.user && PAGE_DATA.user.firstName && <Text style={[ styles.desc, styles.heading, { color: isDarkMode ? Colors.white : Colors.darker } ]}>
              {PAGE_DATA.user.firstName} {PAGE_DATA.user.lastName ? PAGE_DATA.user.lastName : ''}
            </Text>
          }
          {
            PAGE_DATA.userDetails && PAGE_DATA.userDetails.bio && <Text style={[styles.desc, styles.status, { color: isDarkMode ? Colors.white : Colors.darker }]}>
              "{PAGE_DATA.userDetails.bio.trim()}"
            </Text>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 15
  },
  heading: {
    fontWeight: '700',
    fontSize: 20
  },
  desc: {
    marginVertical: 2
  },
  status: {
    marginVertical: 10,
    fontStyle: 'italic'
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    borderRadius: 150,
    marginBottom: 15,
    borderColor: Colors.dark,
    borderWidth: 1,
    shadowColor: Colors.darker,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3.65
  }
});
