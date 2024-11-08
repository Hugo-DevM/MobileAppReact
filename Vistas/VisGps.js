import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VisGPS = (props) => { 
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let locationSubscription;

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

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Actualización cada segundo
          distanceInterval: 1, // Actualización si se mueve 1 metro
        },
        (ubicacion) => {
          setLocation({
            latitude: ubicacion.coords.latitude,
            longitude: ubicacion.coords.longitude,
          });
        }
      );
    })();

    return () => {
      // Cancelar la suscripción cuando el componente se desmonte
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Latitud:</Text>
      <Text style={styles.paragraph}>{location.latitude}</Text>
      <Text>Longitud:</Text>
      <Text style={styles.paragraph}>{location.longitude}</Text>
      <TouchableOpacity 
        style={{ backgroundColor: 'blue', marginTop: 10, borderRadius: 30, height: 80, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => props.navigation.navigate('VisMapDireccion', { lat: location.latitude, lon: location.longitude })}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Mostrar Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default VisGPS;
