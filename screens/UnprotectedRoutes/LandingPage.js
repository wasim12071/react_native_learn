import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, useColorScheme, View, Keyboard } from 'react-native';
import Colors from './../../utils/colors';
import { Section, Header, Button, Footer, RoundTextField as TextField } from './../../components'
import { MainContext } from './../../context';
import { Authenticate } from './../../apis'

export const LandingPage = (props) => {
  const context = useContext(MainContext);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

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
      const response = await Authenticate.login(email, password);
      if (response.success) {
        if (response.data.token && response.data.token !== '') {
          context.setIsLoading(false);
          context.setAuth(response.data);
          context.setSnackbar("Welcome!", "success")
        } else {
          context.setSnackbar(rest.message);
        }
      } else {
        context.setIsLoading(false);
        throw(response);
      }
    } catch (error) {
      context.setIsLoading(false);
      context.setSnackbar("Sorry! Invalid email or password.", "error")
    }
  }

  // Once login is successful, this will take you to the proteted route.
  useEffect(() => {
    if (context.loggedIn === 'true') {
      props.navigation.replace('Protected_Route');
    }
    context.setIsLoading(false);
  }, [context.loggedIn])

  return (
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingTop: 20}]}>
      <Header />
      <View style={[backgroundStyle, styles.sectionContainer]}>
        <Section>
          Please <Text style={styles.highlight}>Login</Text> to continue.
        </Section>
        <View>
          <TextField hideLabel={true} value={email} onChange={(val) => setEmail(val.toLowerCase().trim())} placeholder={'Email'} />
          <TextField hideLabel={true} value={password} onChange={setPassword} placeholder={'Password'} secureTextEntry />
          <Button backgroundColor={ Colors.success } color={ Colors.dark } onPress={onLogin}>
            Login
          </Button>
        </View>
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
