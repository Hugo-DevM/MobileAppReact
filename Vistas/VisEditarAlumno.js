import { View, TextInput, ScrollView, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'; 
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import VisFoto from './visFoto'; 

const VisEditarAlumno = (props) => {
  const [alumno, setAlumno] = useState({
    aluNC: '',
    aluNombre: '',
    aluCorreo: '',
    aluTelefono: '',
    aluCarrera: '',
    aluSexo: '',
    aluFNac: new Date(), 
  });

  const [showFoto, setShowFoto] = useState(false);
  const [show, setShow] = useState(false); 
  const [date, setDate] = useState(new Date()); 
  const [carrera, setCarrera] = useState('seleccionar carrera...');

  const dataCarrera = [
    { label: 'ISC', value: '1' },
    { label: 'IGEM', value: '2' },
    { label: 'Gastronomía', value: '3' },
    { label: 'Electromecánica', value: '4' },
    { label: 'Arquitectura', value: '5' },
    { label: 'Turismo', value: '6' },
  ];

  const handlerChangeText = (field, value) => {
    setAlumno({ ...alumno, [field]: value });
  };

  const obteneralumno = async (id) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'tblAlumnos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setAlumno(data);
      } else {
        Alert.alert('Error', 'El alumno no existe');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  useEffect(() => {
    if (props.route.params && props.route.params.id) {
      obteneralumno(props.route.params.id);
    }
  }, [props.route.params]);

  
  const actualizaralumno = async (Id) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'tblAlumnos', Id);
      await updateDoc(docRef, {
        aluNC: alumno.aluNC,
        aluNombre: alumno.aluNombre,
        aluCorreo: alumno.aluCorreo,
        aluTelefono: alumno.aluTelefono,
        aluCarrera: alumno.aluCarrera,
        aluSexo: alumno.aluSexo,
        aluFNac: date, 
      });
      Alert.alert('Éxito', 'Alumno actualizado');
      props.navigation.navigate('VisCA'); 
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  
  const confirmarEliminar = () => {
    Alert.alert('Eliminar usuario', '¿Estás seguro de eliminar este alumno?', [
      { text: 'Sí', onPress: () => eliminarAlumno(props.route.params.id) },
      { text: 'No', onPress: () => Alert.alert('Eliminación cancelada') },
    ]);
  };

  
  const eliminarAlumno = async (Id) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'tblAlumnos', Id); 
      await deleteDoc(docRef); 
      Alert.alert('Eliminado', 'Alumno eliminado');
      props.navigation.navigate('VisCA'); 
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); 
    setDate(currentDate); 
    handlerChangeText('aluFNac', currentDate); 
  };

  
  const showDatePicker = () => {
    setShow(true);
  };

  const handleChangeCarrera = (value) => {
    setCarrera(value);
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Número de control</Text>
        <TextInput
          style={styles.entrada}
          placeholder="Número de control"
          value={alumno.aluNC}
          onChangeText={(val) => handlerChangeText('aluNC', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Nombre</Text>
        <TextInput
          style={styles.entrada}
          placeholder="Nombre"
          value={alumno.aluNombre}
          onChangeText={(val) => handlerChangeText('aluNombre', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Correo</Text>
        <TextInput
          style={styles.entrada}
          placeholder="Correo"
          value={alumno.aluCorreo}
          onChangeText={(val) => handlerChangeText('aluCorreo', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Teléfono</Text>
        <TextInput
          style={styles.entrada}
          placeholder="Teléfono"
          value={alumno.aluTelefono}
          onChangeText={(val) => handlerChangeText('aluTelefono', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Carrera</Text>
        <Dropdown
          style={styles.entrada}
          data={dataCarrera}
          labelField="label"
          valueField="value"
          placeholder={carrera}
          value={alumno.aluCarrera}
          onChange={(item) => handleChangeCarrera(item.label)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Sexo</Text>
        <RadioButtonGroup selected={alumno.aluSexo} onSelected={(val) => handlerChangeText('aluSexo', val)}>
          <RadioButtonItem value={'Femenino'} label={<Text style={styles.radioText}>Femenino</Text>} />
          <RadioButtonItem value={'Masculino'} label={<Text style={styles.radioText}>Masculino</Text>} />
        </RadioButtonGroup>
      </View>

     
      <View style={styles.inputGroup}>
        <Text style={styles.textos}>Fecha de Nacimiento</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.dateButtonText}>Seleccionar Fecha de Nacimiento</Text>
        </TouchableOpacity>
        <Text style={styles.fecha}>Fecha: {date.toLocaleDateString()}</Text>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      
      <TouchableOpacity
        style={styles.addPhotoButton}
        onPress={() => {
          if (alumno.aluNC !== '') {
            setShowFoto(true);
          } else {
            Alert.alert('Error', 'Agrega el número de control para poder añadir o editar una foto');
          }
        }}
      >
        <Text style={styles.addPhotoButtonText}>Editar Foto</Text>
      </TouchableOpacity>

      {showFoto && alumno.aluNC !== '' && <VisFoto nc={alumno.aluNC} navigation={props.navigation} />}

      
      <TouchableOpacity
        style={styles.addPhotoButton}
        onPress={() => actualizaralumno(props.route.params.id)}
      >
        <Text style={styles.addPhotoButtonText}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addPhotoButton}
        onPress={confirmarEliminar}
      >
        <Text style={styles.addPhotoButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 35, 
    backgroundColor: '#F0F4F8' 
  },
  inputGroup: { 
    flex: 1, 
    padding: 0, 
    marginBottom: 15, 
    borderBottomWidth: 1.5, 
    borderBottomColor: '#B0BEC5' 
  },
  entrada: { 
    flex: 1, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#B0BEC5', 
    padding: 10, 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#2C3E50' 
  },
  textos: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#34495E' 
  },
  radioText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2C3E50' 
  },
  dateButton: {
    padding: 14,
    backgroundColor: '#008CBA', 
    borderRadius: 12,
    marginVertical: 10,
  },
  dateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fecha: {
    fontSize: 16,
    marginTop: 10,
  },
  addPhotoButton: { 
    backgroundColor: '#AEDFF7', 
    padding: 14, 
    alignItems: 'center', 
    borderRadius: 12, 
    marginBottom: 25, 
    elevation: 2 
  },
  addPhotoButtonText: { 
    color: 'black', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});

export default VisEditarAlumno;
