import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet,alert, Button,ScrollView,Text } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';


const VisGPS = (props) =>{ 
  const [location, setLocation] = useState({
      latitude:0,
      longitude:0,

  });

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let ubicacion = await Location.getCurrentPositionAsync({});
      setLocation({
          latitude:ubicacion.coords.latitude,
          longitude:ubicacion.coords.longitude,  

      });
      alert(location.coords.latitude);
      alert(location.coords.longitude);
    })();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text>Latitud:</Text>
      <Text style={styles.paragraph}>{location.latitude}</Text>
      <Text>Longitud:</Text>
      <Text style={styles.paragraph}>{location.longitude}</Text>
      <TouchableOpacity style={{backgroundColor: 'blue', marginTop: 10, borderRadius: 30, height: 80}}
                        onPress={()=> props.navigation.navigate('VisM', {lat: parseFloat(location.latitude), lon: parseFloat(location.longitude)})}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color:'white', margin: 'auto'}}>Mostrar Mapa</Text>
      </TouchableOpacity>
      
    </View>
    

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default VisGPS