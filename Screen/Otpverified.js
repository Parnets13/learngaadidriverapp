import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

function Otpverified({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <Image
        source={require('../assets/Image/circle.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Successfully</Text>
      <Text style={{fontWeight: 'bold', color: 'black'}}>
        Verified Your Mobile Number
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Otpverified;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: '19%',
    height: '9%',
    // marginTop: '40%',
  },
  text: {
    color: 'black',
    fontSize: 25,
    // lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    // backgroundColor: '#000000c0',
  },
  inputView: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: '80%',
    height: '8%',
    marginTop: '20%',
    // borderRadius: 30,
    textAlign: 'center',
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    opacity: 30,
    elevation: 30,
    // shadowColor: '#1e921b',
  },
  btn: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#1e921b', //blue
    // backgroundColor: '#1e921b', //green
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: '15%',
  },
});
