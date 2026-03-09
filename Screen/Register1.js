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
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

function Register1({navigation, route}) {
  const {id} = route.params;

  console.log('id', id);

  const [Category, setCategory] = useState([]);
  const [VehicalType, setVehicalType] = useState('');
  const [VehicalModel, setVehicalModel] = useState('');
  const [Experience, setExperience] = useState();

  useFocusEffect(
    React.useCallback(() => {
      getCategory();
    }, []),
  );

  const getCategory = () => {
    axios
      .get('http://192.168.1.34:8781/api/admin/getCategory')
      .then(function (response) {
        // console.log(response.data.CategoryList);
        setCategory(response.data.CategoryList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const driversignup1 = async () => {
    if (!VehicalType || !VehicalModel || !Experience) {
      alert('Please Fill All The Field');
    } else {
      try {
        const config = {
          url: '/driver/driverUpdate1',
          method: 'post',
          baseURL: 'http://192.168.1.34:8781/api',
          data: {
            driverId: id,
            VehicalType: VehicalType,
            VehicalModel: VehicalModel,
            Experience: Experience,
          },
        };
        let response = await axios(config);
        if (response.status === 200) {
          navigation.navigate('Register2', {id: response.data.data._id});
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        }
      }
    }
  };

  console.log('Category', Category);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1e921b"
        barStyle="light-content"
      />
      <View style={styles.firstconatiner}></View>
      <View style={styles.secondcontainer}>
        <View>
          <ScrollView style={{margin: 10, height: 400}}>
            <Picker
              style={[styles.inputView, {marginTop: '10%'}]}
              selectedValue={VehicalType}
              onValueChange={VehicalType => setVehicalType(VehicalType)}>
              <Picker.Item label="Select Vehicle Type" value="" />
              {Category?.map(cat => (
                <Picker.Item label={cat?.catName} value={cat?.catName} />
              ))}
            </Picker>
            <TextInput
              style={styles.inputView}
              placeholder="Vehicle Number*"
              placeholderTextColor="gray"
              onChangeText={VehicalModel => setVehicalModel(VehicalModel)}
              value={VehicalModel}></TextInput>

            <TextInput
              style={styles.inputView}
              placeholder="Year's of Experience in Driving *"
              placeholderTextColor="gray"
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={Experience => setExperience(Experience)}
              value={Experience}></TextInput>
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity onPress={driversignup1}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Register1;

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
