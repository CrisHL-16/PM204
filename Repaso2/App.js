import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  FlatList, 
  ImageBackground, 
  ActivityIndicator, 
  Alert,
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [isSplash, setIsSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);

  const autorInputRef = useRef(null);
  const generoInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAgregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        genero: genero,
      };

      setLibros((librosActuales) => [nuevoLibro, ...librosActuales]);
      setLoading(false);
      setTitulo('');
      setAutor('');
      setGenero('');
      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (isSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>¡Bienvenido!</Text>
        <Text style={styles.splashSubtext}>Registro de Libros Leídos</Text>
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <ImageBackground 
      // Hemos cambiado los parámetros de la URL (?q=90&fm=jpg&w=1440) para forzar alta definición sin compresión agresiva
      source={{ uri: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=90&fm=jpg&w=1440' }} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlayContainer}>
          <Text style={styles.mainTitle}>Catálogo de Libros</Text>

          {/* Formulario de Registro */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Título del libro"
              placeholderTextColor="#888"
              value={titulo}
              onChangeText={setTitulo}
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => autorInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            
            <TextInput
              ref={autorInputRef}
              style={styles.input}
              placeholder="Autor"
              placeholderTextColor="#888"
              value={autor}
              onChangeText={setAutor}
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => generoInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            
            <TextInput
              ref={generoInputRef}
              style={styles.input}
              placeholder="Género"
              placeholderTextColor="#888"
              value={genero}
              onChangeText={setGenero}
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleAgregarLibro}
            />

            <Pressable 
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                loading && styles.buttonDisabled
              ]}
              onPress={handleAgregarLibro}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Agregar Libro</Text>
            </Pressable>
          </View>

          {/* Indicador de Carga */}
          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" color="#ffffff" />
              <Text style={styles.loadingText}>Guardando libro...</Text>
            </View>
          )}

          {/* Contador Total de Libros */}
          <Text style={styles.counterText}>Total de libros: {libros.length}</Text>

          {/* Lista de Libros Agregados */}
          <FlatList
            data={libros}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardBody}>Autor: {item.autor}</Text>
                <Text style={styles.cardBody}>Género: {item.genero}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#4A148C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  splashSubtext: {
    fontSize: 18,
    color: '#e0e0e0',
    marginTop: 10,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Un poquito más oscuro para aumentar el contraste con la nueva foto
  },
  overlayContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  formContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0d47a1',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  loadingText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 15,
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 14,
    color: '#444',
  },
});