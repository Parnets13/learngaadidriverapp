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
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

function Wallet({navigation}) {
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
        <Text style={styles.headertext}>Wallet</Text>
      </View>
      <View style={styles.firstconatiner}>
        <View style={styles.cir}>
          <Text style={{color: '#1e921b', fontWeight: 'bold', fontSize: 20}}>
            ₹ 60/-
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
          <View style={styles.btn}>
            <Text style={{color: '#1e921b', fontWeight: 'bold', fontSize: 18}}>
              Recharge Now <Entypo name="arrow-long-right" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.profileV}>
        <View style={styles.rupee}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>₹</Text>
        </View>
        <View>
          <Text>Learner Standard Track Course</Text>
          <Text>ID7436573485479866</Text>
          {/* <Text>ID7436573485479866</Text> */}
        </View>
        <View>
          <Text>50/-</Text>
        </View>
      </View>
      <View style={styles.profileV}>
        <View style={styles.rupee1}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>₹</Text>
        </View>
        <View>
          <Text>Learner Standard Track Course</Text>
          <Text>ID7436573485479866</Text>
          {/* <Text>ID7436573485479866</Text> */}
        </View>
        <View>
          <Text>10/-</Text>
        </View>
      </View>
    </View>
  );
}

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  firstconatiner: {
    backgroundColor: '#1e921b',
    height: '40%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cir: {
    backgroundColor: 'white',
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    // marginTop: '30%',
  },
  profileV: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
    // gap: 10,
    justifyContent: 'space-between',
  },
  rupee: {
    backgroundColor: '#1e921b',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rupee1: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
});
