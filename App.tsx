import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartingScreen from './src/screens/StartingScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import { LinearGradient } from 'expo-linear-gradient';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      
      <NavigationContainer>
       
          <Stack.Navigator initialRouteName='Starting' screenOptions={{ headerShown: false, }}>
          {/* <LinearGradient
            colors={['#F87F6F', '#FAB77B', '#FBDC93']}
            style={styles.container}
            > */}
            <Stack.Screen name="Starting" component={StartingScreen} />
            <Stack.Screen name="Game" component={PlayerScreen} />
            <Stack.Screen name="GameOver" component={GameOverScreen} />
            {/* </LinearGradient> */}
          </Stack.Navigator> 
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});
