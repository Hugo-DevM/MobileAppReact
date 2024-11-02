import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firebase from '../BDatos/Realtime';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const database = firebase.database();
    const reference = database.ref('/Raiz/temperatura');

    const onDataChange = snapshot => {
      const values = [];
      snapshot.forEach(childSnapshot => {
        values.push(childSnapshot.val());
      });
      setData(values);
      setLoading(false);
    };

    reference.on('value', onDataChange);

    return () => reference.off('value', onDataChange);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, padding: 16 }}>Temperatura</Text>
      <LineChart
        data={{
          labels: data.map((_, index) => (index + 1).toString()),
          datasets: [{ data }],
        }}
        width={Dimensions.get('window').width}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1, // Redondeo
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default App;
