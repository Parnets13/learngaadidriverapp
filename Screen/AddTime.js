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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

function AddTime({navigation}) {
  const [MtoF, setMtoF] = useState(false);
  const [StoS, setStoS] = useState(false);
  const [sixam_sevenam, setsixam_sevenam] = useState(false);
  const [sevenam_eightam, setsevenam_eightam] = useState(false);
  const [eightam_nineam, seteightam_nineam] = useState(false);
  const [nineam_tenam, setnineam_tenam] = useState(false);
  const [tenam_elevenam, settenam_elevenam] = useState(false);
  const [elevenam_twelvepm, setelevenam_twelvepm] = useState(false);
  const [twelvepm_onepm, settwelvepm_onepm] = useState(false);
  const [onepm_twopm, setonepm_twopm] = useState(false);
  const [twopm_threepm, settwopm_threepm] = useState(false);
  const [threepm_fourpm, setthreepm_fourpm] = useState(false);
  const [fourpm_fivepm, setfourpm_fivepm] = useState(false);
  const [fivepm_sixpm, setfivepm_sixpm] = useState(false);
  const [sixpm_sevenpm, setsixpm_sevenpm] = useState(false);
  const [sevenpm_eightpm, setsevenpm_eightpm] = useState(false);
  const [availableSlots, setavailableSlots] = useState([]);

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

  const addarray = () => {
    console.log('hgh');
    if (sixam_sevenam) {
      availableSlots?.push('06:00 AM --- 07:00 AM');
    }
    if (sevenam_eightam) {
      availableSlots?.push('07:00 AM --- 08:00 AM');
    }
    if (eightam_nineam) {
      availableSlots?.push('08:00 AM --- 09:00 AM');
    }
    if (nineam_tenam) {
      availableSlots?.push('09:00 AM --- 10:00 AM');
    }
    if (tenam_elevenam) {
      availableSlots?.push('10:00 AM --- 11:00 AM');
    }
    if (elevenam_twelvepm) {
      availableSlots?.push('11:00 AM --- 12:00 PM');
    }
    if (twelvepm_onepm) {
      availableSlots?.push('12:00 PM --- 01:00 PM');
    }
    if (onepm_twopm) {
      availableSlots?.push('01:00 PM --- 02:00 PM');
    }
    if (twopm_threepm) {
      availableSlots?.push('02:00 PM --- 03:00 PM');
    }
    if (threepm_fourpm) {
      availableSlots?.push('03:00 PM --- 04:00 PM');
    }
    if (fourpm_fivepm) {
      availableSlots?.push('04:00 PM --- 05:00 PM');
    }
    if (fivepm_sixpm) {
      availableSlots?.push('05:00 PM --- 06:00 PM');
    }

    if (sixpm_sevenpm) {
      availableSlots?.push('06:00 PM --- 07:00 PM');
    }
    if (sevenpm_eightpm) {
      availableSlots?.push('07:00 PM --- 08:00 PM');
    }
    setavailableSlots(availableSlots);
    driverUpdate();
  };

  // console.log('availableSlots', availableSlots, driver?._id);
  const driverUpdate = async () => {
    try {
      const config = {
        url: '/driver/driverUpdate3',
        method: 'post',
        baseURL: 'http://192.168.1.34:8781/api',
        // headers: {'content-type': 'multipart/form-data'},
        data: {
          driverId: driver?._id,
          availableSlots: availableSlots,
        },
      };
      console.log(config, 'config');
      let response = await axios(config);
      if (response.status === 200) {
        await AsyncStorage.setItem(
          'driver',
          JSON.stringify(response.data.driver),
        );
        alert('Your details updated successfully');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.error);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headertext}>Add Your Available Time Slots</Text>
      </View>

      {/* <View style={styles.checkV}>
        <View style={styles.check}>
          <CheckBox
            style={{padding: 10, paddingTop: 0}}
            onClick={() => setMtoF(!MtoF)}
            isChecked={MtoF}
            checkedCheckBoxColor="#1e921b"
          />
          <Text style={{color: 'gray'}}>Week Days(M-F)</Text>
        </View>
        <View style={styles.check}>
          <CheckBox
            style={{padding: 10, paddingTop: 0}}
            onClick={() => setStoS(!StoS)}
            isChecked={StoS}
            checkedCheckBoxColor="#1e921b"
          />
          <Text style={{color: 'gray'}}>Week Ends(S-S)</Text>
        </View>
      </View> */}

      <View style={{margin: 10}}>
        <ScrollView style={{height: 600}}>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>06:00 AM --- 07:00 AM </Text>
            <TouchableOpacity onPress={() => setsixam_sevenam(!sixam_sevenam)}>
              <AntDesign
                name={sixam_sevenam ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>07:00 AM --- 08:00 AM </Text>
            <TouchableOpacity
              onPress={() => setsevenam_eightam(!sevenam_eightam)}>
              <AntDesign
                name={sevenam_eightam ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>08:00 AM --- 09:00 AM </Text>
            <TouchableOpacity
              onPress={() => seteightam_nineam(!eightam_nineam)}>
              <AntDesign
                name={eightam_nineam ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>09:00 AM --- 10:00 AM </Text>
            <TouchableOpacity onPress={() => setnineam_tenam(!nineam_tenam)}>
              <AntDesign
                name={nineam_tenam ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>10:00 AM --- 11:00 AM </Text>
            <TouchableOpacity
              onPress={() => settenam_elevenam(!tenam_elevenam)}>
              <AntDesign
                name={tenam_elevenam ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>11:00 AM --- 12:00 PM </Text>
            <TouchableOpacity
              onPress={() => setelevenam_twelvepm(!elevenam_twelvepm)}>
              <AntDesign
                name={elevenam_twelvepm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>12:00 PM --- 01:00 PM </Text>
            <TouchableOpacity
              onPress={() => settwelvepm_onepm(!twelvepm_onepm)}>
              <AntDesign
                name={twelvepm_onepm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>01:00 PM --- 02:00 PM </Text>
            <TouchableOpacity onPress={() => setonepm_twopm(!onepm_twopm)}>
              <AntDesign
                name={onepm_twopm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>02:00 PM --- 03:00 PM </Text>
            <TouchableOpacity onPress={() => settwopm_threepm(!twopm_threepm)}>
              <AntDesign
                name={twopm_threepm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>03:00 PM --- 04:00 PM </Text>
            <TouchableOpacity
              onPress={() => setthreepm_fourpm(!threepm_fourpm)}>
              <AntDesign
                name={threepm_fourpm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>04:00 PM --- 05:00 PM </Text>
            <TouchableOpacity onPress={() => setfourpm_fivepm(fourpm_fivepm)}>
              <AntDesign
                name={fourpm_fivepm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>05:00 PM --- 06:00 PM </Text>
            <TouchableOpacity onPress={() => setfivepm_sixpm(!fivepm_sixpm)}>
              <AntDesign
                name={fivepm_sixpm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>06:00 PM --- 07:00 PM </Text>
            <TouchableOpacity onPress={() => setsixpm_sevenpm(!sixpm_sevenpm)}>
              <AntDesign
                name={sixpm_sevenpm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeV}>
            <Text style={{color: 'gray'}}>07:00 PM --- 08:00 PM </Text>
            <TouchableOpacity
              onPress={() => setsevenpm_eightpm(!sevenpm_eightpm)}>
              <AntDesign
                name={sevenpm_eightpm ? 'checkcircle' : 'checkcircleo'}
                color="#1e921b"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={addarray}>
          <View style={styles.btn}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddTime;

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
  checkV: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  check: {
    flexDirection: 'row',
  },
  timeV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#f1f1f1',
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
