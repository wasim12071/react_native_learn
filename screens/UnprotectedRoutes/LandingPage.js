import React, { useContext } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Colors from './../../utils/colors';
import { Section, Header, Button, Footer } from './../../components'
import { MainContext } from './../../context';

export const LandingPage = (props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const context = useContext(MainContext);

  const triggerToaster = (title, type) => {
    context.setSnackbar(title, type);
  }

  const triggerLoader = () => {
    context.setIsLoading(true);
    setTimeout( ()=> { 
      context.setIsLoading(false);
    }, 1000);
  }

  const goBack = () => {
    props.navigation.replace('Splash');
  }

  return (
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingBottom: 20}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header backTo="Splash" onPress={goBack}>
          Welcome!
      </Header>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={[backgroundStyle]}>
        <View>
          <Section title="Introduction">
            My name is <Text style={styles.highlight}>Wasim Hassan Khan</Text>.
          </Section>
          <Section title="Qualification">
            I have done my Masters in <Text style={styles.highlight}>Data Science and Analytics</Text>.
          </Section>
          <Section title="Profession">
            I'm working as a <Text style={styles.highlight}>Senior Full Stack Developer</Text>.
          </Section>
          <Section title="Skills">
            I'm an expert in <Text style={styles.highlight}>NodeJs Development</Text>.
          </Section>
          <View style={styles.sectionContainer}>
            <Section title="Success Trigger">
              Lets Trigger Success
            </Section>
            <Button onPress={ () => triggerToaster('Triggered', 'success')} backgroundColor={Colors.success} color={Colors.dark}>
              <AntIcon name="checkcircleo" size={18} /> Success
            </Button>
          </View>
          <View style={styles.sectionContainer}>
            <Section title="Loader Trigger">
              Lets Trigger 1 second loader
            </Section>
            <Button onPress={ () => triggerLoader()} >
              <AntIcon name="loading1" size={18} /> Loader
            </Button>
          </View>
        </View>
      </ScrollView>
      <Footer>
          Made by Waism Hassan Khan!
      </Footer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {  fontWeight: '700' },
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24
  }
});
