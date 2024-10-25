import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Firebase from '../BDatos/Firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import VisFoto from './visFoto'; // Componente de carga de fotos

const VisAltaAlumno = (props) => {
  const [state, setState] = useState({
    aluNC: '',
    aluNombre: '',
    aluCorreo: '',
    aluTelefono: '',
  });

  const [sexo, setSexo] = useState('Femenino');
  const [carrera, setCarrera] = useState('seleccionar carrera...');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showFoto, setShowFoto] = useState(false);

  const data = [
    { label: 'ISC', value: '1' },
    { label: 'IGEM', value: '2' },
    { label: 'Gastronomía', value: '3' },
    { label: 'Electromecánica', value: '4' },
    { label: 'Arquitectura', value: '5' },
    { label: 'Turismo', value: '6' },
  ];

  const handleChangeSexo = (value) => {
    setSexo(value);
  };

  const handleChangeCarrera = (value) => {
    setCarrera(value);
  };

  const guardarAlumno = async () => {
    if (state.aluNC === '' || state.aluNombre === '') {
      Alert.alert('Error', 'Favor de llenar los campos');
    } else {
      try {
        await Firebase.collection('tblAlumnos').add({
          aluNC: state.aluNC,
          aluNombre: state.aluNombre,
          aluCorreo: state.aluCorreo,
          aluTelefono: state.aluTelefono,
          aluFNac: date.toLocaleDateString([], { dateStyle: 'medium' }),
          aluSexo: sexo,
          aluCarrera: carrera,
        });

        Alert.alert('Éxito', 'Alumno agregado correctamente');
        props.navigation.navigate('VisCA');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Error al agregar alumno');
      }
    }
  };

  const handleChangeText = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDataPicker = () => {
    setShow(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Alumno</Text>

        <Text style={styles.text}>Número de control</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Número de control"
          onChangeText={(value) => handleChangeText('aluNC', value)}
        />

        <Text style={styles.text}>Nombre</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText('aluNombre', value)}
        />

        <Text style={styles.text}>Correo</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Correo"
          onChangeText={(value) => handleChangeText('aluCorreo', value)}
        />

        <Text style={styles.text}>Número de teléfono</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Número de teléfono"
          onChangeText={(value) => handleChangeText('aluTelefono', value)}
        />

        <Text style={styles.text}>Selecciona un sexo</Text>
        <RadioButtonGroup selected={sexo} onSelected={handleChangeSexo}>
          <RadioButtonItem value={'Femenino'} label={<Text style={styles.radioText}>Femenino</Text>} />
          <RadioButtonItem value={'Masculino'} label={<Text style={styles.radioText}>Masculino</Text>} />
        </RadioButtonGroup>

        <Text style={styles.text}>Carrera</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={carrera}
          searchPlaceholder="Buscar..."
          onChange={(item) => handleChangeCarrera(item.label)}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />

        <TouchableOpacity style={styles.dateButton} onPress={showDataPicker}>
          <Text style={styles.dateButtonText}>Seleccionar Fecha de Nacimiento</Text>
        </TouchableOpacity>
        <Text style={styles.fecha}>Fecha: {date.toLocaleDateString()}</Text>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={() => {
            if (state.aluNC !== '') {
              setShowFoto(true);
            } else {
              Alert.alert('Error', 'Agrega el número de control para poder añadir una foto');
            }
          }}
        >
          <Text style={styles.addPhotoButtonText}>Agregar Foto</Text>
        </TouchableOpacity>

        {showFoto && state.aluNC !== '' && (
          <VisFoto nc={state.aluNC} navigation={props.navigation} />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={guardarAlumno}>
          <Text style={styles.saveButtonText}>Guardar Alumno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VisAltaAlumno;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8', // Azul muy claro para el fondo
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Blanco puro para resaltar los elementos
    elevation: 3, // Sombras sutiles para dar profundidad
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2C3E50', // Azul oscuro para mejor legibilidad
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold', // Bold para todos los textos
    marginBottom: 8,
    color: '#34495E', // Azul intermedio para los títulos
  },
  inputText: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0BEC5', // Gris suave
    marginBottom: 25,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  radioText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  dropdown: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#B0BEC5',
    marginBottom: 25,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#95A5A6', // Gris suave para los placeholders
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  dateButton: {
    backgroundColor: '#AEDFF7', // Azul pastel
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2, // Sombra ligera
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  fecha: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
  addPhotoButton: {
    backgroundColor: '#AEDFF7', // Azul pastel
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 25,
    elevation: 2,
  },
  addPhotoButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#AEDFF7', // Azul pastel
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
