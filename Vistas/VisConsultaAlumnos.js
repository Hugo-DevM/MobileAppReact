import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const VisConsultaAlumnos = (props) => {
  const [alumnos, setAlumnos] = useState([]);

  const mostrarAlumnos = async () => {
    try {
      const db = getFirestore();
      const rsAlumnos = [];
      const querySnapshot = await getDocs(collection(db, 'tblAlumnos'));

      querySnapshot.forEach((doc) => {
        const { aluNC, aluNombre, aluApellidos, aluCorreo } = doc.data();
        rsAlumnos.push({
          id: doc.id,
          aluNC,
          aluNombre,
          aluApellidos,
          aluCorreo,
        });
      });

      setAlumnos(rsAlumnos);
    } catch (e) {
      Alert.alert('Error', `Mensaje: ${e.message}`);
    }
  };

  useEffect(() => {
    const refresh = props.navigation.addListener('focus', mostrarAlumnos);

    return () => {
      props.navigation.removeListener('focus', mostrarAlumnos);
    };
  }, [props.navigation]);



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.registrarBoton}
          onPress={() => {
            props.navigation.navigate('VAlumno');
          }}
        >
          <Text style={styles.textoBoton}>Registrar Alumno</Text>
        </TouchableOpacity>

        <View style={styles.listaContainer}>
          {alumnos.map((alumno) => (
            <ListItem
              key={alumno.id}
              bottomDivider
              containerStyle={styles.listItem}
              onPress={() =>
                props.navigation.navigate('VEAlumno', {
                  id: alumno.id,
                })
              }
            >
              <Avatar
                rounded
                title="usr"
                size="medium"
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {alumno.aluNombre} {alumno.aluApellidos}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubtitle}>
                  {alumno.aluNC} - {alumno.aluCorreo}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default VisConsultaAlumnos;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  registrarBoton: {
    backgroundColor: '#AEDFF7',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoBoton: {
    fontSize: 17,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  listaContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginVertical: 8,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 5,
  },
  listSubtitle: {
    fontSize: 15,
    color: '#666',
  },
});
