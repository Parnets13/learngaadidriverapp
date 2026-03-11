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
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from 'react-native-check-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

function AllStudentdetails({route, navigation}) {
  const {item} = route.params;
  const [Booking, setBooking] = useState({});
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

  const getBookingByID = () => {
    axios
      .get('${API_CONFIG.BASE_URL}/user/getBooking')
      .then(function (response) {
        setBooking(
          response.data.BookingList?.find(pen => pen?._id === item?._id),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        StartTraning();
        setError(null);
      },
      error => {
        console.error('Error fetching location:', error);
        setError('Error fetching location');
      },
    );
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (latitude && longitude) {
  //       StartTraning();
  //     }
  //   }, [latitude, longitude]),
  // );

  const StartTraning = async () => {
    try {
      const config = {
        url: '/user/StartDailyBooking',
        method: 'post',
        baseURL: '${API_CONFIG.BASE_URL}',
        data: {
          BookingID: item?._id,
          Driverlatitude: latitude,
          Driverlongitude: longitude,
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        // alert(`Training Started successfully`);
        navigation.navigate('Usertrack', {item: item});
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          // {backgroundColor: modalVisible || modalExtend ? 'gray' : 'white'},
        ]}>
        <StatusBar
          translucent
          backgroundColor="#1e921b"
          barStyle="light-content"
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" color="white" size={25} />
          </TouchableOpacity>
          <Text style={styles.headertext}>Student Details</Text>
        </View>
        <ScrollView>
          <View style={styles.profileV}>
            <View style={{flex: 0.7}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                <Ionicons
                  name="person-circle"
                  color="#1e921b"
                  size={20}
                  style={{margin: 10}}
                />
                {item?.userName}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                <FontAwesome
                  name="phone"
                  color="#1e921b"
                  size={20}
                  style={{margin: 10}}
                />
                {item?.userContactNumber}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                <Entypo
                  name="location-pin"
                  color="#1e921b"
                  size={20}
                  style={{margin: 10}}
                />
                {item?.userArea}, {item?.userCity},{item?.userState},
                {item?.userCountry} - {item?.userPincode}
              </Text>
            </View>

            <Image
              source={{
                uri:
                  'https://learngaadi-x496.onrender.com/User/' + item?.users[0]?.profilepic,
              }}
              style={styles.profileAvatar}
            />
          </View>
          <View style={styles.profileV}>
            <View style={styles.package}>
              <Text
                style={{
                  color: '#1e921b',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {item?.Name}
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                <Entypo name="time-slot" />
                {item?.SelectedTime}
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                <Entypo name="location-pin" size={15} />
                {item?.StartAddress}
              </Text>

              <Image
                source={{
                  uri:
                    'https://learngaadi-x496.onrender.com/Category/' +
                    item?.categorie[0]?.catImage,
                }}
                style={styles.courseimg}
              />

              {/* <FontAwesome name="car" color="red" size={30} /> */}
            </View>
          </View>

          <TouchableOpacity onPress={getCurrentLocation}>
            <View style={styles.btn}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Start Training
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

export default AllStudentdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  profileV: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
    border: 'none',
  },
  profileV1: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
  },
  courseimg: {
    width: 80,
    height: 50,
    borderRadius: 100,
  },
  dateV: {
    backgroundColor: '#1e921b',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  dateV1: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#1e921b',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    flex: 0.3,
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
  inputView: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: 250,
    height: 100,
    marginTop: '15%',
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    backgroundColor: '#f1f1f1',
    opacity: 30,
    elevation: 30,
    shadowColor: 'gray',
  },
  inputView1: {
    alignSelf: 'center',
    // borderWidth: 1,
    width: 250,
    height: 50,
    marginTop: '15%',
    borderRadius: 10,
    padding: 10,
    borderColor: 'gray',
    marginBottom: '10%',
    color: 'black',
    backgroundColor: '#f1f1f1',
    opacity: 30,
    elevation: 30,
    shadowColor: 'gray',
  },
  btnPuase: {
    alignSelf: 'center',
    margin: 10,
    backgroundColor: '#1e921b',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
