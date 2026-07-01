/* zona de importaciones */
import { StatusBar } from 'expo-status-bar'; // Corregido: StatusBar
import { StyleSheet, View, Text } from 'react-native';
import Perfil from '../components/Perfil';

/* zona main */
export default function TarjetasScreen() { // Corregido: Cambiado App por TarjetasScreen
  return (
    <View style={styles.container}>
      <Perfil
        style={styles.tarjetaVerde}
        nombre="Cristian1"
        carrera="Ingeniería en Sistemas Computacionales"
        materia="Móvil"
        cuatri="9"
      />

      <Perfil
        style={styles.tarjetaRoja}
        nombre="Carlos2"
        carrera="Sistemas Computacionales"
        materia="Móvil"
        cuatri="9"
      />
      <Perfil
        style={styles.tarjetaVerde}
        nombre="Cristian3"
        carrera="Ingeniería en Sistemas Computacionales"
        materia="Móvil"
        cuatri="9"
      />
      <StatusBar style="auto"/>
    </View>
  );
}

/* estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tarjetaVerde: {
    backgroundColor: 'green',
  },
  tarjetaRoja: {
    backgroundColor: 'red',
  },
});