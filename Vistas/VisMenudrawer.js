import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer,useNavigation,DrawerActions} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon  from 'react-native-vector-icons/Entypo';

import VisInicio from './VisInicio';
import VisGrafica from './VisGrafica';
import VisGps from './VisGps';
import VisConsultaAlumnos from './VisConsultaAlumnos';
import VistaAltaAlumno from './VisAltaAlumno';
import VisFoto from './visFoto';
import VisEditarAlumno from './VisEditarAlumno';


const DrawerApp=()=>{
  const Drawer=createDrawerNavigator();
  return(
    <Drawer.Navigator screenOptions={{
      statusBarcoloe: '#0163d2',
      headerStyle: {
        backgroundColor: '#0163d2'    
      },
      headerTintColor:'#fff',
      headerTitleAlign:'center',  
      headerTitle: 'App de Alumnos',
      headerShown:true,
      
    }}>

            <Drawer.Screen name="VInicio" component={VisInicio} options={{
                title: 'Home',
                drawerIcon: config => <Icon
                size={23}
                name= "home"/>
            }} /> 
            <Drawer.Screen name="VisCA" component={VisConsultaAlumnos} options={{
                title: 'CA',
                drawerIcon: config => <Icon
                size={23}
                name= "home"/> 
            }} /> 
            <Drawer.Screen name="VAlumno" component={VistaAltaAlumno} 
            options={{
                drawerItemStyle:{display:'none'}
            }} /> 
             <Drawer.Screen name="VEAlumno" component={VisEditarAlumno} 
            options={{
                drawerItemStyle:{display:'none'}
            }} /> 
               <Drawer.Screen name="VisGA" component={VisGrafica} options={{
                title: 'Grafica',
                drawerIcon: config => <Icon
                size={23}
                name= "home"/> 
            }} /> 
            <Drawer.Screen name="VisGP" component={VisGps} options={{
                title: 'Gps',
                drawerIcon: config => <Icon
                size={23}
                name= "home"/> 
            }} /> 
           
            

            

  </Drawer.Navigator>

  
  )
}

function VisMenuDrawer() {
        return(
            <DrawerApp/>
        );
}


export default VisMenuDrawer;