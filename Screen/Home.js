import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Switch,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_CONFIG from '../config';
import Geolocation from '@react-native-community/geolocation';
import {BackHandler} from 'react-native';

function Home({navigation}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getBookingForDrivers();
    setRefreshing(false);
  };
  const [driver, setdriver] = useState({});
  const [data, setdata] = useState([]);

  const [isEnabled, setIsEnabled] = useState();
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    editduty();
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  // const [pending, setpending] = useState({});
  // const [Accepted, setAccepted] = useState();
  // const [hasAcceptedBooking, setHasAcceptedBooking] = useState(false);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null);
        // console.log('position', position);
      },
      error => {
        console.error('Error fetching location:', error);
        setError('Error fetching location');
      },
    );
  };

  // useEffect(() => {
  //   if (latitude && longitude && !hasAcceptedBooking) {
  //     AcceptBooking();
  //     setHasAcceptedBooking(true);
  //   }
  // }, [latitude, longitude]);

  const driverData = async () => {
    let driver = await AsyncStorage.getItem('driver');
    setdriver(JSON.parse(driver));
  };

  useFocusEffect(
    React.useCallback(() => {
      driverData();
    }, []),
  );

  const editduty = async () => {
    console.log('inside', isEnabled);
    try {
      const config = {
        url: '/driver/editduty',
        method: 'post',
        baseURL: API_CONFIG.BASE_URL,
        data: {driverID: driver?._id, DriverDuty: isEnabled},
      };
      let response = await axios(config);
      if (response.status === 200) {
        await AsyncStorage.setItem(
          'driver',
          JSON.stringify(response.data.driver),
        );
        driverData();
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.error);
      }
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (driver?.DriverDuty) {
  //       getBookingForDrivers();
  //     }
  //   }, [driver?.DriverDuty]),
  // );

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => {
        if (driver?.DriverDuty) {
          getCurrentLocation();
          getBookingForDrivers();
        }
      }, 5000); // 5000 milliseconds = 5 seconds

      // Clean up function to clear the interval when the component unmounts or when dependency changes
      return () => clearInterval(intervalId);
    }, [driver?.DriverDuty]),
  );

  useEffect(() => {
    if (latitude && longitude) {
      getBookingForDrivers();
    }
  }, [latitude]);

  const [Booking, setBooking] = useState([]);

  const getBookingForDrivers = () => {
    console.log('Fetching bookings for driver...');

    axios
      .get(`${API_CONFIG.BASE_URL}/user/getDailyBooking`)
      .then(function (response) {
        // console.log('asfd', response.data.BookingList);
        setBooking(
          response.data.BookingList?.filter(pen => {
            const R = 6371; // Radius of the Earth in kilometers
            const toRad = value => (value * Math.PI) / 180;

            const dLat = toRad(pen?.latitute - latitude);
            const dLon = toRad(pen?.logitute - longitude);

            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(latitude)) *
                Math.cos(toRad(pen?.latitute)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in kilometers
            // console.log('distance', distance);

            return (
              pen?.courses[0]?.CourseCategory === driver?.VehicalType &&
              !pen?.Rejected_Driver_ID?.includes(driver?._id) &&
              pen?.Status === 'Pending' &&
              distance <= 3
            );
          }),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AcceptBooking = async pending => {
    if (latitude && longitude) {
      try {
        const config = {
          url: '/user/AcceptDailyBooking',
          method: 'post',
          baseURL: API_CONFIG.BASE_URL,
          data: {
            BookingID: pending?._id,
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
          setLatitude(null);
          setLongitude(null);
          alert(`Booking Accepted successfully`);
          getBookingForDrivers();
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
  };

  const RejectBooking = async pending => {
    try {
      const config = {
        url: '/user/RejectDailyBooking',
        method: 'post',
        baseURL: API_CONFIG.BASE_URL,
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
      .get(`${API_CONFIG.BASE_URL}/driver/getalldriver`)
      .then(async function (response) {
        // console.log(response.data.driver);
        const xyz = response.data.driver?.filter(
          item => item?._id === driver?._id,
        );
        setdata(xyz);
        await AsyncStorage.setItem('driver', JSON.stringify(xyz[0]));
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
      .get(`${API_CONFIG.BASE_URL}/driver/driverSignout/${driver?._id}`)
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

  // console.log('isEnabled', isEnabled, driver?.DriverDuty);
  // console.log('latitude', latitude, longitude);
  // console.log('Booking', Booking);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to close the app?',
          [
            {
              text: 'Cancel',
              onPress: () => null, // Do nothing on cancel
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp(), // Exit app if OK is pressed
            },
          ],
          {cancelable: false}, // Prevent dismissing alert by tapping outside
        );
        return true; // Prevent default back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require('../assets/Image/home.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.profile}>
          <View style={{flexDirection: 'row', gap: 75}}>
            <View style={styles.profile}>
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Entypo
                  name="menu"
                  color="white"
                  size={30}
                  style={{marginTop: 10}}
                />
              </TouchableOpacity>
              <Text style={styles.text}>{driver?.name}</Text>
            </View>
            <View style={{marginTop: 25}}>
              <Switch
                trackColor={{false: 'white', true: 'white'}}
                thumbColor={
                  !isEnabled
                    ? driver?.DriverDuty
                      ? '#1e921b'
                      : 'red'
                    : isEnabled
                    ? '#1e921b'
                    : 'red'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled ? isEnabled : driver?.DriverDuty}
              />
              <Text style={{color: 'white', textAlign: 'center'}}>
                Duty {driver?.DriverDuty ? 'on' : 'off'}
              </Text>
            </View>
            {/* <Image
              source={{
                uri: 'http://192.168.1.34:8781/Driver/' + driver?.profilepic,
              }}
              style={styles.profileimage}
            /> */}
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {driver?.DriverDuty ? (
            <>
              {Booking?.map(pending => (
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
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      marginTop: 10,
                    }}>
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: 30,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        AcceptBooking(pending, 'Accepted');
                      }}>
                      <View>
                        <Text
                          style={{
                            color: '#1e921b',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          Accept
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => RejectBooking(pending)}>
                      <View>
                        <Text
                          style={{
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          Reject
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('StudentDetaisl', {
                          pending: pending,
                        })
                      }>
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          View More
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={{marginTop: '150%', bottom: 0}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Turn on your duty to get new booking
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    // height: '100%',
    flex: 1,
  },
  profile: {
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 10,
    paddingTop: '5%',
  },
  profileimage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 20,
    // marginLeft:-21,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'white', //blue
    // backgroundColor: '#1e921b', //green
    paddingVertical: 70,
    paddingHorizontal: 50,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#1e921b',
  },
  package: {
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: '20%',
  },
});
