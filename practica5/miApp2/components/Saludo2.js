import { Text, Image, View, Button } from "react-native";

export const Saludo2 = () => {
  
  return (
<View>
    <Text>Hola RN: componente propio</Text>
    <Image source={require('../assets/wave.png')} /> 
    <Button title="Hola 204"></Button>     
 </View>
  )
};