import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

function Home1({navigation}) {
  const [mobile, setmobile] = useState();

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
          <View style={{flexDirection: 'row', gap: 180}}>
            <View style={styles.profile}>
              <TouchableOpacity
                onPress={() => {
                  //   navigation.openDrawer();
                }}>
                <Entypo
                  name="menu"
                  color="white"
                  size={30}
                  style={{marginTop: 10}}
                />
              </TouchableOpacity>
              <Text style={styles.text}>Pooja</Text>
            </View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
              }}
              style={styles.profileimage}
            />
          </View>
        </View>

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Accepted')}>
              <View>
                <Text
                  style={{color: '#1e921b', fontWeight: 'bold', fontSize: 18}}>
                  Accept
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                  Reject
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('StudentDetaisl')}>
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                  View More
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Home1;

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
    marginTop: '50%',
  },
});
