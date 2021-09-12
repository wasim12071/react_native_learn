import React, { useContext, useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View, Keyboard } from 'react-native';
import Colors from './../../utils/colors';
import { Section, Header, Button, Footer, RoundTextField as TextField } from './../../components'
import { MainContext } from './../../context';
import { Authenticate, Blogs } from './../../apis'

export const LandingPage = (props) => {
  const context = useContext(MainContext);
  const isDarkMode = useColorScheme() === 'dark';
  const focused = useIsFocused();
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  const [PAGE_DATA, setOnLoad] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Login validation check
  const onLogin = () =>{
    if(email.length < 1){
      context.setSnackbar("Email cannot be empty", 'error');
    }
    else if(!re.test(email)){
      context.setSnackbar("Please provide a valid email", 'warning');
    }
    else if(password.length < 1){
      context.setSnackbar("Password cannot be empty", 'error');
    }
    else{
      Login()
    }
  }
  
  // Login trigger.
  const Login = async () => {
    context.setIsLoading(true);
    Keyboard.dismiss();
    try {
      const response = await Authenticate.login({ email, password });
      if (response.success) {
        context.setIsLoading(false);
        context.setSnackbar("Welcome!", "success")
      } else {
        context.setIsLoading(false);
        throw(response);
      }
    } catch (error) {
      context.setIsLoading(false);
      console.error('Landing Error:', error)
      context.setSnackbar("Sorry! Invalid email or password.", "error")
    }
  }

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

  return (
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingBottom: 20}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      <View style={[backgroundStyle, styles.sectionContainer]}>
        <Section>
          Please <Text style={styles.highlight}>Login</Text> to continue.
        </Section>
        <View>
          <TextField hideLabel={true} value={email} onChange={(val) => setEmail(val.toLowerCase().trim())} placeholder={'Email'} />
          <TextField hideLabel={true} value={password} onChange={setPassword} placeholder={'Password'} secureTextEntry />
          <Button onPress={onLogin}>
            <AntIcon name="check" size={18}/> Lets Roll!
          </Button>
        </View>
        <Section>
          We currently have <Text style={styles.highlight}>{PAGE_DATA.count}</Text> blog{ (PAGE_DATA.count && PAGE_DATA.count !== 1) ? 's' : ''} uploaded in our system.
        </Section>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700'
  },
  sectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: Dimensions.get('window').height - 110,
    paddingHorizontal: 15
  }
});
