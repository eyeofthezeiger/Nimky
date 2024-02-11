import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartingScreen from './src/screens/StartingScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import GameOverScreen from './src/screens/GameOverScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Starting' screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Starting" component={StartingScreen} />
        <Stack.Screen name="Game" component={PlayerScreen} />
        <Stack.Screen name="GameOver" component={GameOverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
