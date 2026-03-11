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
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

function StudentDetaisl({navigation, route}) {
  const {pending} = route.params;
  const [driver, setdriver] = useState({});
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null);

  const driverData = async () => {
    let driver = await AsyncStorage.getItem('driver');
    setdriver(JSON.parse(driver));
  };

  useFocusEffect(
    React.useCallback(() => {
      driverData();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        getCurrentLocation();
      }, 5000); // 5000 milliseconds = 5 seconds

      // Clean up function to clear the interval when the component unmounts or when dependency changes
      return () => clearInterval(intervalId);
    }, []),
  );

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null);
      },
      error => {
        console.error('Error fetching location:', error);
        setError('Error fetching location');
      },
    );
  };

  const AcceptBooking = async data => {
    if (latitude && longitude) {
      try {
        const config = {
          url: '/user/AcceptDailyBooking',
          method: 'post',
          baseURL: '${API_CONFIG.BASE_URL}',
          data: {
            BookingID: pending?._id,
            Status: data,
            DriverID: driver?._id,
            DriverName: driver?.name,
            DriverMobile: driver?.mobile,
            AssignedBy: 'Self',
            Status: 'Accepted',
            Driverlatitude: latitude,
            Driverlongitude: longitude,
          },
        };
        let response = await axios(config);
        if (response.status === 200) {
          alert(`Booking ${data} successfully`);
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
  };

  const RejectBooking = async () => {
    try {
      const config = {
        url: '/user/RejectDailyBooking',
        method: 'post',
        baseURL: '${API_CONFIG.BASE_URL}',
        data: {
          BookingID: pending?._id,
          DriverID: driver?._id,
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        alert(`Booking rejected successfully`);
        getBookingForDrivers();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    if (driver && Object.keys(driver)?.length > 0) {
      // Fetch data immediately on component mount
      getalldriver();

      // Set up interval to fetch data every minute (60000 ms)
      const intervalId = setInterval(getalldriver, 30000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [driver]);

  const getalldriver = () => {
    axios
      .get('${API_CONFIG.BASE_URL}/driver/getalldriver')
      .then(function (response) {
        // console.log(response.data.driver);
        setdata(
          response.data.driver?.filter(item => item?._id === driver?._id),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (data[0]?.blockstatus) {
      logout();
    }
  }, [data]);

  const logout = () => {
    axios
      .get('${API_CONFIG.BASE_URL}/driver/driverSignout/' + driver?._id)
      .then(function (response) {
        console.log(response.data.Success);
        alert('Sorry..!, Your blocked from admin');
        AsyncStorage.removeItem('driver');
        navigation.navigate('Otplogin');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log('pending', pending);
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
        <Text style={styles.headertext}>Student Details</Text>
      </View>
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
            {pending?.users[0]?.name}
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
            {pending?.users[0]?.mobile}
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
            {pending?.users[0]?.Area}, {pending?.users[0]?.City},
            {pending?.users[0]?.State}, {pending?.users[0]?.Country} -
            {pending?.users[0]?.Pincode}
          </Text>
        </View>
        <Image
          source={{
            uri:
              'https://learngaadi-x496.onrender.com/User/' + pending?.users[0]?.profilepic,
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
            {pending?.Name}
          </Text>
          {/* <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 5,
              }}>
              <Fontisto name="date" /> {pending?.selectedDate}
            </Text>
            <View
              style={{
                backgroundColor: '#1e921b',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                {pending?.courses[0]?.PracticalDays +
                  pending?.courses[0]?.SimulatorDays +
                  pending?.courses[0]?.TheoryDays}
              </Text>
            </View>
          </View> */}
          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <Entypo name="time-slot" /> {pending?.SelectedTime}
          </Text>
          {/* <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            ₹ {pending?.TotalAmount}
          </Text> */}

          <Text
            style={{
              color: 'black',
              fontSize: 16,
            }}>
            <Entypo name="location-pin" size={15} />
            {pending?.StartAddress}
          </Text>
          {/* <FontAwesome name="car" color="red" size={30} /> */}
          <Image
            source={{
              uri:
                'https://learngaadi-x496.onrender.com/Category/' +
                pending?.categorie[0]?.catImage,
            }}
            style={styles.courseimg}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => AcceptBooking('Accepted')}>
              {/* // navigation.navigate('Accepted') */}
              <View>
                <Text
                  style={{color: '#1e921b', fontWeight: 'bold', fontSize: 18}}>
                  Accept
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => RejectBooking()}>
              <View>
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                  Reject
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default StudentDetaisl;

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
  profileV: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 10,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    flex: 0.3,
  },
  courseimg: {
    width: 80,
    height: 50,
    borderRadius: 100,
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
