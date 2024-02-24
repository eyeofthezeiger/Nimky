import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../navigationTypes';

type GameOverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameOver'>;
type GameOverScreenRouteProp = RouteProp<RootStackParamList, 'GameOver'>;

interface GameOverScreenProps {
  navigation: GameOverScreenNavigationProp;
  route: GameOverScreenRouteProp;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ navigation, route }) => {
  const { playerOneName, playerTwoName, playerOnePoints, playerTwoPoints, points } = route.params;

  return (
    <LinearGradient
      colors={['#F87F6F', '#FAB77B', '#FBDC93']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.title}>Game Over</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Congratulations {playerOneName} and {playerTwoName}!</Text>
          <Text style={styles.scoreText}>{points} team points!</Text>
          <Text style={styles.scoreText}>
            {playerOnePoints === playerTwoPoints
              ? "It's a tie for MVP!!!"
              : `${playerOnePoints > playerTwoPoints ? playerOneName : playerTwoName} is the MVP!!!`}
          </Text>
          <Text style={styles.scoreText}>{playerOneName} had {playerOnePoints} points!</Text>
          <Text style={styles.scoreText}>{playerTwoName} had {playerTwoPoints} points!</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game', { playerOneName, playerTwoName })}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Starting')}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    width: '60%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameOverScreen;
