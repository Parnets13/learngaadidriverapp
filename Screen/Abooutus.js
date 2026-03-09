import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

function Abooutus({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" color="white" size={25} />
        </TouchableOpacity>
        {/* <Text style={styles.headertext}>Aboout us</Text> */}
      </View>

      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          margin: 10,
          color: '#1e921b',
          fontWeight: 'bold',
        }}>
        About Us
      </Text>
      <ScrollView>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image
              source={require('../assets/Image/two-wheeler.jpg')}
              style={styles.image}
            />
            <Image
              source={require('../assets/Image/img.jpg')}
              style={styles.image1}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image
              source={require('../assets/Image/two-wheeler2.jpg')}
              style={styles.image1}
            />
            <Image
              source={require('../assets/Image/Bus.jpg')}
              style={styles.image}
            />
          </View>
          <View style={{marginTop: '10%'}}>
            <Text style={{textAlign: 'justify', color: 'black'}}>
              Venkateshwara Motor Driving School in Rajajinagar offers expert
              driving lessons with a focus on safety and confidence. Our
              experienced instructors provide personalized training for all
              levels, from beginners to advanced drivers. Learn to drive
              proficiently with our comprehensive courses and gain the skills
              needed for safe, responsible driving.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Abooutus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  header: {
    marginTop: '9%',
    width: '100%',
    backgroundColor: '#1e921b',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  headertext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 130,
    height: 130,
    // marginTop: '15%',
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  image1: {
    width: 150,
    height: 160,
    // marginTop: '10%',
    borderRadius: 10,
    resizeMode: 'stretch',
  },
});
