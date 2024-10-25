import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'

const VisInicio= (porps)=>{
  return(
    <ImageBackground
    source={require('../imagenes/FOTO1.jpg')}
    style={styles.fondo}
    >
    <View style={ styles.container}>

    </View>
    </ImageBackground>
  );

}
const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    
  },
  fondo:{
    flex:1,
    resizeMode:'cover',
    justifyContent:'center'

  }

})
export default VisInicio