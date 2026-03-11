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
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {AadharcardImage} from '../assets/Image/Dl.jpg';
import CheckBox from 'react-native-check-box';
import axios from 'axios';
import API_CONFIG from '../config';

function Register2({navigation, route}) {
  const {id} = route.params;

  console.log('Driver ID:', id);
  const [Aadharcard, setAadharcard] = useState();

  const handleChooseAadharcard = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setAadharcard(response.assets[0]);
      }
    });
  };

  const [DrivingLicence, setDrivingLicence] = useState();

  const handleChooseDrivingLicence = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setDrivingLicence(response.assets[0]);
      }
    });
  };

  const [name, setname] = useState('');
  const [isChecked, setisChecked] = useState(false);

  let formdata = new FormData();

  const driverUpdate2 = async () => {
    if (!isChecked) {
      alert('Please read the terms of conditions & Privacy policy');
      return;
    }
    
    if (!Aadharcard) {
      alert('Please upload Aadharcard');
      return;
    }
    
    if (!DrivingLicence) {
      alert('Please upload Driving Licence');
      return;
    }
    
    try {
      console.log('=== Uploading Documents ===');
      console.log('Driver ID:', id);
      console.log('Aadhar:', Aadharcard?.fileName);
      console.log('DL:', DrivingLicence?.fileName);
      
      formdata.append('Aadharcard', {
        name: Aadharcard.fileName,
        type: Aadharcard.type,
        uri: Platform.OS === 'ios' ? Aadharcard.uri.replace('file://', '') : Aadharcard.uri,
      });
      formdata.append('DrivingLicence', {
        name: DrivingLicence.fileName,
        type: DrivingLicence.type,
        uri: Platform.OS === 'ios' ? DrivingLicence.uri.replace('file://', '') : DrivingLicence.uri,
      });
      formdata.append('driverId', id);

      console.log('Sending to:', API_CONFIG.BASE_URL + '/driver/driverUpdate2');
      
      const config = {
        url: '/driver/driverUpdate2',
        method: 'post',
        baseURL: API_CONFIG.BASE_URL,
        timeout: API_CONFIG.TIMEOUT,
        headers: {'content-type': 'multipart/form-data'},
        data: formdata,
      };
      
      let response = await axios(config);
      
      console.log('✅ Response:', response.status);
      
      if (response.status === 200) {
        alert('You have registered successfully with LearnGaadi');
        navigation.navigate('Otplogin');
      }
    } catch (error) {
      console.log('=== Upload Error ===');
      console.log('Error:', error.message);
      
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
        alert(error.response.data.error || 'Upload failed. Please try again.');
      } else if (error.request) {
        console.log('❌ Network Error - No response');
        alert(
          'Cannot connect to server.\n\n' +
          'Please check:\n' +
          '1. Internet connection\n' +
          '2. Server might be sleeping\n\n' +
          'Try again in a moment.'
        );
      } else {
        console.log('Error:', error.message);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <View style={styles.firstconatiner}></View>
      <View style={styles.secondcontainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: 'black', fontSize: 20}}>
              Upload Aadhar Card
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleChooseAadharcard}>
              <View style={styles.image}>
                {Aadharcard !== undefined ? (
                  <Image source={{uri: Aadharcard.uri}} style={styles.image} />
                ) : (
                  <Image
                    source={require('../assets/Image/aadhar.png')}
                    style={styles.image}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.icon}>
              <IconButton
                icon="camera"
                iconColor="blue"
                size={20}
                onPress={handleChooseAadharcard}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: 'black', fontSize: 20}}>
              Upload Driving Licence
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleChooseDrivingLicence}>
              <View style={styles.image}>
                {DrivingLicence !== undefined ? (
                  <Image
                    source={{uri: DrivingLicence.uri}}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../assets/Image/Dl.jpg')}
                    style={styles.image}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.icon}>
              <IconButton
                icon="camera"
                iconColor="blue"
                size={20}
                onPress={handleChooseDrivingLicence}
              />
            </View>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', marginTop: '10%', alignSelf: 'center'}}>
          <CheckBox
            style={{padding: 10, paddingTop: 0}}
            onClick={() => setisChecked(!isChecked)}
            isChecked={isChecked}
            checkedCheckBoxColor="blue"
          />
          <View>
            <Text style={{color: 'black'}}>By continuing you agree to the</Text>
            <Text style={{fontWeight: '700', color: 'blue'}}>
              Terms of Use & Privacy Policy
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={driverUpdate2} style={{marginTop: '10%'}}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Sign-Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Register2;

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
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  icon: {
    top: -26,
    left: 50,
    alignSelf: 'center',
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
