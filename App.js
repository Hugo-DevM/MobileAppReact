import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
import VisLogin from './Vistas/VisLogin';
import VisFlex from './Vistas/VisFlex'
import VisMenudrawer from './Vistas/VisMenudrawer';


function MyStack(){
  return(
    <Stack.Navigator>
    <Stack.Screen name='VLogin' component={VisLogin} options={{title: 'Login  '}} />
     <Stack.Screen name='VMenu' component={VisMenudrawer} options={{headeShow:false}} />
      <Stack.Screen name='VFlex' component={VisFlex} options={{title: 'Practica Flex 1'}} />

    </Stack.Navigator>
  )
} 

function App(){
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

export default App;