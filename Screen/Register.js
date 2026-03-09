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
import axios from 'axios';

function Register({navigation}) {
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

  function validatename(inputtxt) {
    var phoneno = /^[a-zA-Z ]{2,30}$/; // var no = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      alert('You have entered an invalid name!');
      return false;
    }
  }

  function phonenumbe(inputtxt) {
    var phoneno = /^[6-9]\d{9}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      toast.show('You have entered an invalid mobile number!', {
        type: 'warning',
        placement: 'top',
      });
      return false;
    }
  }

  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [DrivingSchoolName, setDrivingSchoolName] = useState('');
  const [Area, setArea] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Country, setCountry] = useState('');
  const [Pincode, setPincode] = useState('');

  let formdata = new FormData();

  const driversignup = async () => {
    if (!profile) {
      alert('Please select Profile Image');
    } else if (
      !name ||
      !DrivingSchoolName ||
      !mobile ||
      !Area ||
      !City ||
      !State ||
      !Country ||
      !Pincode
    ) {
      alert('Please Fill All The Field');
    } else {
      try {
        if (validatename(name) && phonenumbe(mobile)) {
          formdata.append('profilepic', {
            name: profile.fileName,
            type: profile.type,
            uri:
              Platform.OS === 'ios'
                ? profile.uri.replace('file://', '')
                : profile.uri,
          });
          formdata.append('name', name);
          formdata.append('DrivingSchoolName', DrivingSchoolName);
          formdata.append('mobile', mobile);
          formdata.append('Area', Area);
          formdata.append('City', City);
          formdata.append('State', State);
          formdata.append('Country', Country);
          formdata.append('Pincode', Pincode);

          const config = {
            url: '/driver/driverSignup',
            method: 'post',
            baseURL: 'http://192.168.1.34:8781/api',
            headers: {'content-type': 'multipart/form-data'},
            data: formdata,
          };
          let response = await axios(config);
          if (response.status === 200) {
            // alert('You have registered successfully with LearnGaadi');
            navigation.navigate('Register1', {id: response.data.data._id});
          }
          if (response.status === 300) {
            alert(
              'Entered Mobile No. is already registered. Please try with another Mobile No.',
            );
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
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
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View>
            {profile !== undefined ? (
              <Image source={{uri: profile.uri}} style={styles.image} />
            ) : (
              <Image
                source={require('../assets/Image/pf.jpg')}
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
            onPress={handleChoosePhoto}
          />
        </View>
        <View>
          <ScrollView style={{margin: 10, height: 400}}>
            <TextInput
              style={styles.inputView}
              placeholder="Name *"
              placeholderTextColor="gray"
              onChangeText={name => setname(name)}
              value={name}></TextInput>

            <TextInput
              style={styles.inputView}
              placeholder="Mobile Number *"
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={mobile => setmobile(mobile)}
              value={mobile}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder="Driving School Name *"
              placeholderTextColor="gray"
              onChangeText={DrivingSchoolName =>
                setDrivingSchoolName(DrivingSchoolName)
              }
              value={DrivingSchoolName}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder="Area *"
              placeholderTextColor="gray"
              onChangeText={Area => setArea(Area)}
              value={Area}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder="City *"
              placeholderTextColor="gray"
              onChangeText={City => setCity(City)}
              value={City}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder="State *"
              placeholderTextColor="gray"
              onChangeText={State => setState(State)}
              value={State}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder="Country *"
              placeholderTextColor="gray"
              onChangeText={Country => setCountry(Country)}
              value={Country}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder="Pincode *"
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={6}
              onChangeText={Pincode => setPincode(Pincode)}
              value={Pincode}></TextInput>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity onPress={driversignup}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Register;

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
    borderRadius: 50,
  },
  icon: {
    top: -26,
    left: 30,
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
