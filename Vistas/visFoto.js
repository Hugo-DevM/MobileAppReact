import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../BDatos/Firebase'; // Asegúrate de que esta ruta sea correcta
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

const VisFoto = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const refresh = props.navigation.addListener('focus', async () => {
      setImage(null);
      setIsLoading(false);
    });
    return refresh;
  }, [props]);

  // Función para seleccionar una imagen y cargarla en Firebase
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storageRef = storage().ref(`alumnos/${props.nc}`);
      uploadBytes(storageRef, blob).then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            console.log('URL de la imagen:', url);
            setImage(url);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      });
    }
  };

  // Función para mostrar la imagen seleccionada
  const showImage = () => {
    if (image) {
      return (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200 }}
          resizeMode="cover"
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView>
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Cargar Foto
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: '#AEDFF7', 
              padding: 12,
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: '#2C3E50', fontWeight: 'bold' }}>Seleccionar Imagen</Text> 
            {/* Texto negro con un tono oscuro */}
          </TouchableOpacity>
          {showImage()}
        </>
      )}
    </View>
  </SafeAreaView>
  
  );
};

export default VisFoto;
