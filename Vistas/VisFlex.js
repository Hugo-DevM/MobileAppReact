import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App(props) {
  return (
    <View style={styles.container}>
      
      <View style={styles.cabeza}>
      
        <Text style={styles.texto}>Práctica de Flex 1</Text>
      </View>
      <View style={styles.filas}>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
        <View style={styles.elemento}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00eeff', 
    paddingTop: 50,
    paddingBottom: 20,
  },
  cabeza: {
    backgroundColor: '#2C3E50', 
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
  },
  filas: {
    flex: 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 5,
    backgroundColor: 'white'
  },
  elemento: {
    width: 80,
    height: 150,
    backgroundColor: '#8000ff', 
    margin: 10,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#7227bc', 
  },

});