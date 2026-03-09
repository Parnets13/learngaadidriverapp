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

function Contactus({navigation}) {
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
        <Text style={styles.headertext}>Contact us</Text>
      </View>
      <View>
        <Image
          source={require('../assets/Image/cardrive1.png')}
          style={styles.image}
        />
        <Text style={{color: 'black', textAlign: 'center'}}>Learn Gaadi</Text>
        <Text style={{color: 'black', textAlign: 'center'}}>9737687788</Text>
        <Text style={{color: 'black', textAlign: 'center'}}>
          Learngaadi@gmail.com
        </Text>
        <Text style={{color: 'black', textAlign: 'center'}}>
          Singpura, Vidyaranyapura, Bengalore - 560097
        </Text>
      </View>
    </View>
  );
}

export default Contactus;

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
  image: {
    width: 150,
    height: 150,
    marginTop: '30%',
    alignSelf: 'center',
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
