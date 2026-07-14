import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Inicio", href: null }} />
      
      <Tabs.Screen 
        name="alta" 
        options={{ 
          title: "Registro Usuarios", 
          tabBarIcon: ({ color, size }) => <Feather name="user-plus" size={size} color={color} />
        }} 
      />
      
      <Tabs.Screen 
        name="consulta" 
        options={{ 
          title: "Consulta", 
          tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} />
        }} 
      />
    </Tabs>
  );
}