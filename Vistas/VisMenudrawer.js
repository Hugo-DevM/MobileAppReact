import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';


import VisInicio from './VisInicio';
import VisGrafica from './VisGrafica';
import VisGps from './VisGps';
import VisConsultaAlumnos from './VisConsultaAlumnos';
import VistaAltaAlumno from './VisAltaAlumno';
import VisFoto from './visFoto';
import VisEditarAlumno from './VisEditarAlumno';
import VisMapa from './VisMapa';

const Drawer = createDrawerNavigator();

const DrawerApp = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0163d2', 
          elevation: 5, 
        },
        headerTintColor: '#fff', 
        headerTitleAlign: 'center', 
        headerTitle: 'APP DE ALUMNOS', 
        drawerStyle: {
          backgroundColor: '#F0F4F8', 
          width: 250, 
        },
        drawerLabelStyle: {
          fontSize: 16, 
          fontWeight: 'bold', 
          color: '#34495E', 
        },
        drawerActiveBackgroundColor: '#AEDFF7', 
        drawerActiveTintColor: '#0163d2', 
        drawerInactiveTintColor: '#34495E', 
        drawerItemStyle: {
          marginVertical: 5, 
        },
      }}
    >
      <Drawer.Screen
        name="VInicio"
        component={VisInicio}
        options={{
          title: 'Inicio',
          drawerIcon: (config) => (
            <Icon size={23} name="home" color={config.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="VisCA"
        component={VisConsultaAlumnos}
        options={{
          title: 'Consulta Alumnos',
          drawerIcon: (config) => (
            <Icon size={23} name="home" color={config.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="VAlumno"
        component={VistaAltaAlumno}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="VEAlumno"
        component={VisEditarAlumno}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="VisGA"
        component={VisGrafica}
        options={{
          title: 'Gráfica',
          drawerIcon: (config) => (
            <Icon size={23} name="home" color={config.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="VisGP"
        component={VisGps}
        options={{
          title: 'GPS',
          drawerIcon: (config) => (
            <Icon size={23} name="home" color={config.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="VisM"
        component={VisMapa}
        options={{
          drawerItemStyle:{display:'none'}
        }}
      />
    </Drawer.Navigator>
  );
};

function VisMenuDrawer() {
  return <DrawerApp />;
}

export default VisMenuDrawer;

const styles = StyleSheet.create({
  
});