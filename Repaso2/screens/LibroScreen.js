import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, ImageBackground, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function LibroScreen() {
  const [isSplash, setIsSplash] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [cargando, setCargando] = useState(false);
  const [libros, setLibros] = useState([]);

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

    setCargando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((librosActuales) => [nuevoLibro, ...librosActuales]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);

      Alert.alert('Alert', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (isSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Cargando catálogo...</Text>
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={{ uri: 'Fondo.jpeg' }} 
      style={styles.background}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
          <Text style={styles.mainTitle}>Catálogo de Libros</Text>

          <View style={styles.formulario}>
            <TextInput style={styles.input} placeholder="Título del libro" placeholderTextColor="#777" value={titulo} onChangeText={setTitulo} editable={!cargando} />
            <TextInput style={styles.input} placeholder="Autor" placeholderTextColor="#777" value={autor} onChangeText={setAutor} editable={!cargando} />
            <TextInput style={styles.input} placeholder="Género" placeholderTextColor="#777" value={genero} onChangeText={setGenero} editable={!cargando} />

            <Pressable 
              style={({ pressed }) => [styles.btnAgregar, pressed && styles.btnPresionado, cargando && styles.btnDeshabilitado]}
              onPress={handleAgregarLibro}
              disabled={cargando}
            >
              <Text style={styles.btnText}>Agregar Libro</Text>
            </Pressable>
          </View>

          {cargando && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.loadingText}>Guardando libro...</Text>
            </View>
          )}

          <Text style={styles.contadorText}>Total de libros: {libros.length}</Text>

          <FlatList 
            data={libros}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.cardLibro}>
                <Text style={styles.cardTitulo}>{item.titulo}</Text>
                <Text style={styles.cardDetalle}>Autor: {item.autor}</Text>
                <Text style={styles.cardDetalle}>Género: {item.genero}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay libros registrados aún.</Text>}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#1e3a8a', justifyContent: 'center', alignItems: 'center' },
  splashText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  scrollContainer: { padding: 20, paddingTop: 50, paddingBottom: 40 },
  mainTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  formulario: { width: '100%', marginBottom: 15 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 12, color: '#000' },
  btnAgregar: { backgroundColor: '#0f172a', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  btnPresionado: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  btnDeshabilitado: { backgroundColor: '#475569' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loadingBox: { backgroundColor: 'rgba(0,0,0,0.7)', flexDirection: 'row', padding: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
  loadingText: { color: '#fff', marginLeft: 10, fontSize: 14, fontWeight: '500' },
  contadorText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  cardLibro: { backgroundColor: 'rgba(255,255,255,0.95)', padding: 15, borderRadius: 8, marginBottom: 10 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  cardDetalle: { fontSize: 14, color: '#444', marginTop: 2 },
  emptyText: { color: '#ddd', textAlign: 'center', fontStyle: 'italic', marginTop: 15 }
});