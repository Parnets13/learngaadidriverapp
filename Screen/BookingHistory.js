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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import API_CONFIG from '../config';

function BookingHistory({navigation}) {
  const [driver, setdriver] = useState({});
  const [Booking, setBooking] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [selcted, setselcted] = useState('Accepted');
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
      if (Object.keys(driver)?.length > 0) {
        getBookingByDriverID();
      }
    }, [driver]),
  );

  const getBookingByDriverID = () => {
    axios
      .get(`${API_CONFIG.BASE_URL}/user/getDailyBooking`)
      .then(function (response) {
        console.log('Booking List:', response.data.BookingList);
        const driverBookings = response.data.BookingList?.filter(
          item => item?.DriverID === driver?._id,
        );
        setBooking(driverBookings);
        
        const filtered = driverBookings?.filter(item => {
          if (selcted === 'Accepted') {
            return item?.Status === 'Accepted';
          } else {
            return item?.Status === selcted;
          }
        });
        setfilterData(filtered);
      })
      .catch(function (error) {
        console.log('Booking History Error:', error.message);
        if (error.response) {
          console.log('Error Response:', error.response.data);
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (Booking?.length > 0) {
        setfilterData(
          Booking?.filter(item => {
            if (selcted === 'Accepted') {
              return item?.Status === 'Accepted';
            } else {
              return item?.Status === selcted;
            }
          }),
        );
      }
    }, [selcted]),
  );

  console.log('Booking', Booking?.length);

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
        <Text style={styles.headertext}>Booking History</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
        <TouchableOpacity onPress={() => setselcted('Accepted')}>
          <View
            style={{
              backgroundColor: selcted === 'Accepted' ? 'purple' : '#e0e0e0',
              borderRadius: 10,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <Text style={{color: selcted === 'Accepted' ? 'white' : '#666', fontWeight: selcted === 'Accepted' ? 'bold' : 'normal'}}>
              Accepted
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselcted('Ongoing')}>
          <View
            style={{
              backgroundColor: selcted === 'Ongoing' ? 'orange' : '#e0e0e0',
              borderRadius: 10,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <Text style={{color: selcted === 'Ongoing' ? 'white' : '#666', fontWeight: selcted === 'Ongoing' ? 'bold' : 'normal'}}>
              Ongoing
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselcted('Completed')}>
          <View
            style={{
              backgroundColor: selcted === 'Completed' ? 'red' : '#e0e0e0',
              borderRadius: 10,
              padding: 10,
              paddingHorizontal: 15,
            }}>
            <Text style={{color: selcted === 'Completed' ? 'white' : '#666', fontWeight: selcted === 'Completed' ? 'bold' : 'normal'}}>
              Completed
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {filterData?.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome name="history" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No {selcted} bookings found</Text>
            <Text style={styles.emptySubText}>
              Your booking history will appear here
            </Text>
          </View>
        ) : (
          filterData?.map((book, index) => (
            <View key={book?._id || index}>
              {book?.Status === 'Completed' ? (
              <>
                <View style={styles.profileV}>
                  <View style={styles.package}>
                    <Text
                      style={{
                        color: '#1e921b',
                        fontWeight: 'bold',
                        fontSize: 18,
                        textAlign: 'center',
                      }}>
                      {book?.Name}
                    </Text>
                    {/* <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 5,
                    }}>
                    <Fontisto name="date" /> {book?.selectedDate}
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
                      {book?.courses[0]?.PracticalDays +
                        book?.courses[0]?.SimulatorDays +
                        book?.courses[0]?.TheoryDays}
                    </Text>
                  </View>
                  {book?.Extended_Days > 0 ? (
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
                        {book?.Extended_Days}
                      </Text>
                    </View>
                  ) : (
                    ''
                  )}
                </View> */}
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}>
                      <Entypo name="time-slot" /> {book?.SelectedTime}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}>
                      <Entypo name="time-slot" /> Total km :{' '}
                      {book?.endkm - book?.startkm}
                    </Text>
                    {/* <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                  }}>
                  ₹ {book?.TotalAmount}
                </Text> */}
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                      }}>
                      <Entypo name="location-pin" size={15} />
                      {book?.StartAddress}
                    </Text>
                    {book?.categorie && book?.categorie[0]?.catImage && (
                      <Image
                        source={{
                          uri: `${API_CONFIG.BASE_URL.replace('/api', '')}/Category/${book?.categorie[0]?.catImage}`,
                        }}
                        style={styles.courseimg}
                      />
                    )}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color:
                          book?.Status === 'Accepted'
                            ? 'purple'
                            : book?.Status === 'Ongoing'
                            ? 'orange'
                            : 'red',
                      }}>
                      {book?.Status}
                    </Text>
                    {/* <FontAwesome name="car" color="red" size={30} /> */}
                    <Text style={{color: 'gray', textAlign: 'right'}}>
                      {moment(book?.createdAt).format('Do MMM YYYY')}
                    </Text>
                  </View>
                </View>
              </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AllStudentdetails', {item: book})
                    }>
                    <View style={styles.profileV}>
                    <View style={styles.package}>
                      <Text
                        style={{
                          color: '#1e921b',
                          fontWeight: 'bold',
                          fontSize: 18,
                          textAlign: 'center',
                        }}>
                        {book?.Name}
                      </Text>
                      {/* <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 5,
                    }}>
                    <Fontisto name="date" /> {book?.selectedDate}
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
                      {book?.courses[0]?.PracticalDays +
                        book?.courses[0]?.SimulatorDays +
                        book?.courses[0]?.TheoryDays}
                    </Text>
                  </View>
                  {book?.Extended_Days > 0 ? (
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
                        {book?.Extended_Days}
                      </Text>
                    </View>
                  ) : (
                    ''
                  )}
                </View> */}
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                        }}>
                        <Entypo name="time-slot" /> {book?.SelectedTime}
                      </Text>
                      {/* <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                  }}>
                  ₹ {book?.TotalAmount}
                </Text> */}
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                        }}>
                        <Entypo name="location-pin" size={15} />
                        {book?.StartAddress}
                      </Text>
                      {book?.categorie && book?.categorie[0]?.catImage && (
                        <Image
                          source={{
                            uri: `${API_CONFIG.BASE_URL.replace('/api', '')}/Category/${book?.categorie[0]?.catImage}`,
                          }}
                          style={styles.courseimg}
                        />
                      )}
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color:
                            book?.Status === 'Accepted'
                              ? 'purple'
                              : book?.Status === 'Ongoing'
                              ? 'orange'
                              : 'red',
                        }}>
                        {book?.Status}
                      </Text>
                      {/* <FontAwesome name="car" color="red" size={30} /> */}
                      <Text style={{color: 'gray', textAlign: 'right'}}>
                        {moment(book?.createdAt).format('Do MMM YYYY')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            </View>
          ))
        )}
        {/* <View style={styles.profileV}>
          <View style={styles.package}>
            <Text
              style={{
                color: '#1e921b',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              Learner Standard Track Course
            </Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                <Fontisto name="date" /> 18th April
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
                  20
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="time-slot" /> 06:00 PM --- 07:00 PM
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              ₹ 5000
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="location-pin" size={15} />
              Singapura, Vidyranyapuram,Bengalore
            </Text>
            <MaterialCommunityIcons name="motorbike" color="red" size={30} />
            <Text style={{color: 'gray', textAlign: 'right'}}>
              15th April 2024
            </Text>
          </View>
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
              Learner Standard Track Course
            </Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                <Fontisto name="date" /> 18th April
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
                  20
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="time-slot" /> 06:00 PM --- 07:00 PM
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              ₹ 5000
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="location-pin" size={15} />
              Singapura, Vidyranyapuram,Bengalore
            </Text>
            <FontAwesome name="car" color="red" size={30} />
            <Text style={{color: 'gray', textAlign: 'right'}}>
              15th April 2024
            </Text>
          </View>
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
              Learner Standard Track Course
            </Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                <Fontisto name="date" /> 18th April
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
                  20
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="time-slot" /> 06:00 PM --- 07:00 PM
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              ₹ 5000
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="location-pin" size={15} />
              Singapura, Vidyranyapuram,Bengalore
            </Text>
            <FontAwesome name="car" color="red" size={30} />
            <Text style={{color: 'gray', textAlign: 'right'}}>
              15th April 2024
            </Text>
          </View>
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
              Learner Standard Track Course
            </Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 5,
                }}>
                <Fontisto name="date" /> 18th April
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
                  20
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="time-slot" /> 06:00 PM --- 07:00 PM
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              ₹ 5000
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
              }}>
              <Entypo name="location-pin" size={15} />
              Singapura, Vidyranyapuram,Bengalore
            </Text>
            <FontAwesome name="car" color="red" size={30} />
            <Text style={{color: 'gray', textAlign: 'right'}}>
              15th April 2024
            </Text>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
}

export default BookingHistory;

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
  profileV1: {
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
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
