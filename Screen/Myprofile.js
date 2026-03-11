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

function Myprofile({navigation}) {
  const [profile, setprofile] = useState();
  const [ProfileImage, setProfileImage] = useState(
    'https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png',
  );

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setprofile(response.assets[0]);
      }
    });
  };

  const [driver, setdriver] = useState({});

  const driverData = async () => {
    let driver = await AsyncStorage.getItem('driver');
    setdriver(JSON.parse(driver));
  };

  useFocusEffect(
    React.useCallback(() => {
      driverData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <View style={styles.firstconatiner}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{margin: 10, marginTop: '10%'}}>
          <Entypo name="chevron-left" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.secondcontainer}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          {profile ? (
            <Image source={profile} style={styles.image} />
          ) : (
            <Image
              source={{
                uri: 'https://learngaadi-x496.onrender.com/Driver/' + driver?.profilepic,
              }}
              style={styles.image}
            />
          )}
        </TouchableOpacity>

        <View>
          <ScrollView style={{margin: 10, height: 400}}>
            <View style={{borderBottomWidth: 1}}>
              <Text style={{textAlign: 'center', color: 'black'}}>
                {driver?.name}
              </Text>
              <Text style={{textAlign: 'center', color: 'black'}}>
                {driver?.mobile}
              </Text>
              <Text style={{textAlign: 'center', color: 'black'}}>
                {driver?.Area}, {driver?.City}, {driver?.State},{' '}
                {driver?.Country}, {driver?.Pincode}
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              {/* <Text style={{color: 'black'}}>{driver?.DrivingSchoolName}</Text> */}
              <Text style={{color: 'black'}}>{driver?.VehicalType}</Text>
              <Text style={{color: 'black'}}>{driver?.VehicalModel}</Text>
              <Text style={{color: 'black'}}>
                {driver?.Experience} years of experience in driving
              </Text>
              <View
                style={{
                  marginTop: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Image
                  source={{
                    uri:
                      'https://learngaadi-x496.onrender.com/Driver/' + driver?.Aadharcard,
                  }}
                  style={styles.image1}
                />
                <Image
                  source={{
                    uri:
                      'https://learngaadi-x496.onrender.com/Driver/' +
                      driver?.DrivingLicence,
                  }}
                  style={styles.image1}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Edit</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

export default Myprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  firstconatiner: {
    backgroundColor: '#1e921b',
    height: '40%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  secondcontainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '-30%',
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: '-10%',
    borderRadius: 100,
  },
  image1: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  text: {
    color: '#1e921b',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '22%',
    margin: 10,
  },
  inputView: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: '95%',
    height: 50,
    // marginTop: '20%',
    // borderRadius: 30,
    // textAlign: 'center',
    padding: 10,
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    backgroundColor: '#f1f1f1',
    // opacity: 30,
    // elevation: 30,
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
    // marginTop: '15%',
  },
});
