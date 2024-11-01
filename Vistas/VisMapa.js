import React, { useState, useEffect, Text } from 'react';
import { Platform, View, StyleSheet,alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
//import MapView from 'react-native-maps'
import MapView, { Marker } from "react-native-maps";

const VisMapa = (props) =>{ 

    const [region, setRegion] = useState({
        latitude: props.route.params.lat,
        longitude: props.route.params.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      useEffect (() => {
        setRegion
      }, [props]);  
         
      
    return (
        <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
        <Marker coordinate={{ 
          latitude:props.route.params.lat, 
          longitude:props.route.params.lon }} />
      </MapView>
    );
  };

  
  export default VisMapa;