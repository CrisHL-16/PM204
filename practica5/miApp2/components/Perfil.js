import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const Perfil = ({ nombre, carrera, materia, cuatri, style }) => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View style={[styles.tarjeta, style]}>
      <Text style={styles.nombre}>{nombre}</Text>

      {mostrar && (
        <>
          <Text style={styles.carrera}>{carrera}</Text>
          <Text style={styles.otroTexto}>{materia}</Text>
          <Text style={styles.otroTexto}>{cuatri}</Text>
        </>
      )}

      <Button
        title="Ver perfil"
        onPress={() => setMostrar(!mostrar)}
      />
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  nombre: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tarjeta: {
    borderWidth: 2,
    padding: 15,
    margin: 10,
  },
  carrera: {
    fontSize: 18,
    color: 'blue',
  },
  otroTexto: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});