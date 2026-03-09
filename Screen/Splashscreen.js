import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splashscreen({navigation}) {
  const [driver, setdriver] = useState({});
  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    if (Object.keys(driver).length > 0) {
      setTimeout(() => {
        condition();
      }, 1000);
    }
  }, [driver]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('driver');
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setdriver(JSON.parse(value));
      } else {
        setTimeout(() => {
          navigation.navigate('Otplogin');
          condition();
        }, 1000);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const condition = () => {
    console.log(driver);
    if (Object.keys(driver).length > 0) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Otplogin');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        // backgroundColor="#1e921b"
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Video
        source={require('../assets/Video/splasscreenVideo.mp4')}
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode={'cover'}
        repeat
        style={styles.video}
      />
      <View style={styles.content}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Otplogin')}> */}
        <Text style={styles.text}>Welcome to Learn Gaadi</Text>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Learn Driving, Travel anywere across world
        </Text>
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});
