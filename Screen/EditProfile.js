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
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

function EditProfile({navigation}) {
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

  const [name, setname] = useState('');
  const [mobile, setmobile] = useState();
  // const [DrivingSchoolName, setDrivingSchoolName] = useState('');
  const [Area, setArea] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Country, setCountry] = useState('');
  const [Pincode, setPincode] = useState();
  const [Category, setCategory] = useState([]);
  const [VehicalType, setVehicalType] = useState('');
  const [VehicalModel, setVehicalModel] = useState('');
  const [Experience, setExperience] = useState();
  const [Aadharcard, setAadharcard] = useState();
  const [DrivingLicence, setDrivingLicence] = useState();

  const handleChooseAadharcard = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setAadharcard(response.assets[0]);
      }
    });
  };

  const handleChooseDrivingLicence = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setDrivingLicence(response.assets[0]);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getCategory();
    }, []),
  );

  const getCategory = () => {
    axios
      .get('${API_CONFIG.BASE_URL}/admin/getCategory')
      .then(function (response) {
        // console.log(response.data.CategoryList);
        setCategory(response.data.CategoryList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let formdata = new FormData();

  const EditDriver = async () => {
    try {
      formdata.append(
        'profilepic',
        profile
          ? {
              name: profile.fileName,
              type: profile.type,
              uri:
                Platform.OS === 'ios'
                  ? profile.uri.replace('file://', '')
                  : profile.uri,
            }
          : driver?.profilepic,
      );
      formdata.append(
        'Aadharcard',
        Aadharcard
          ? {
              name: Aadharcard.fileName,
              type: Aadharcard.type,
              uri:
                Platform.OS === 'ios'
                  ? Aadharcard.uri.replace('file://', '')
                  : Aadharcard.uri,
            }
          : driver?.Aadharcard,
      );
      formdata.append('name', name ? name : driver?.name);
      formdata.append('mobile', mobile ? mobile : driver?.mobile);
      // formdata.append(
      //   'DrivingSchoolName',
      //   DrivingSchoolName ? DrivingSchoolName : driver?.DrivingSchoolName,
      // );
      formdata.append('Area', Area ? Area : driver?.Area);
      formdata.append('City', City ? City : driver?.City);
      formdata.append('State', State ? State : driver?.State);
      formdata.append('Country', Country ? Country : driver?.Country);
      formdata.append('Pincode', Pincode ? Pincode : driver?.Pincode);
      formdata.append(
        'VehicalType',
        VehicalType ? VehicalType : driver?.VehicalType,
      );
      formdata.append(
        'VehicalModel',
        VehicalModel ? VehicalModel : driver?.VehicalModel,
      );
      formdata.append(
        'Experience',
        Experience ? Experience : driver?.Experience,
      );
      formdata.append('driverID', driver?._id);

      const config = {
        url: '/driver/editprofile',
        method: 'post',
        baseURL: '${API_CONFIG.BASE_URL}',
        headers: {'content-type': 'multipart/form-data'},
        data: formdata,
      };
      let response = await axios(config);
      if (response.status === 200) {
        await AsyncStorage.setItem(
          'driver',
          JSON.stringify(response.data.driver),
        );
        alert('Your details updated successfully');
        navigation.navigate('Myprofile');
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
        <View style={styles.icon}>
          {/* <IconButton
              icon="camera"
              iconColor="blue"
              size={20}
              onPress={handleChoosePhoto}
            /> */}
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Entypo name="edit" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView style={{margin: 10, height: 400}}>
            <TextInput
              style={styles.inputView}
              placeholder={driver?.name}
              placeholderTextColor="gray"
              onChangeText={name => setname(name)}
              value={name}></TextInput>

            <TextInput
              style={styles.inputView}
              placeholder={driver?.mobile?.toString()}
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={mobile => setmobile(mobile)}
              value={mobile}></TextInput>
            {/* <TextInput
              style={styles.inputView}
              placeholder={driver?.DrivingSchoolName}
              placeholderTextColor="gray"
              onChangeText={DrivingSchoolName =>
                setDrivingSchoolName(DrivingSchoolName)
              }
              value={DrivingSchoolName}></TextInput> */}
            <TextInput
              style={styles.inputView}
              placeholder={driver?.Area}
              placeholderTextColor="gray"
              onChangeText={Area => setArea(Area)}
              value={Area}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder={driver?.City}
              placeholderTextColor="gray"
              onChangeText={City => setCity(City)}
              value={City}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder={driver?.State}
              placeholderTextColor="gray"
              onChangeText={State => setState(State)}
              value={State}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder={driver?.Country}
              placeholderTextColor="gray"
              onChangeText={Country => setCountry(Country)}
              value={Country}></TextInput>
            <TextInput
              style={styles.inputView}
              placeholder={driver?.Pincode?.toString()}
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={6}
              onChangeText={Pincode => setPincode(Pincode)}
              value={Pincode}></TextInput>
            <Picker
              style={[styles.inputView]}
              selectedValue={VehicalType}
              onValueChange={VehicalType => setVehicalType(VehicalType)}>
              <Picker.Item label={driver?.VehicalType} value="" />
              {Category?.map(cat => (
                <Picker.Item label={cat?.catName} value={cat?.catName} />
              ))}
            </Picker>
            <TextInput
              style={styles.inputView}
              placeholder={driver?.VehicalModel}
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={6}
              onChangeText={VehicalModel => setVehicalModel(VehicalModel)}
              value={VehicalModel}></TextInput>

            <TextInput
              style={styles.inputView}
              placeholder={driver?.Experience}
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={Experience => setExperience(Experience)}
              value={Experience}></TextInput>
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
                      <Image
                        source={{uri: Aadharcard.uri}}
                        style={styles.image}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            'https://learngaadi-x496.onrender.com/Driver/' +
                            driver?.Aadharcard,
                        }}
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
                        source={{
                          uri:
                            'https://learngaadi-x496.onrender.com/Driver/' +
                            driver?.DrivingLicence,
                        }}
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
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity onPress={EditDriver}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfile;

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

  icon: {
    top: -26,
    left: 35,
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
