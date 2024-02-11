import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';
import { RouteProp } from '@react-navigation/native';

type PlayerScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Game'>

// Props type definition for component, assuming scores are passed as props
type PlayerScreenProps = {
    navigation: PlayerScreenNavigationProp;
    route: PlayerScreenRouteProp;
};

const PlayerScreen: React.FC<PlayerScreenProps> = ({navigation, route}) => {
    const {playerOneName, playerTwoName } = route.params;
  const [answer, setAnswer] = useState('');

  // Add logic for timer, points, and handling answer submission here

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.timer}>00:30</Text>
        <Text style={styles.header}>Player1: {playerOneName} , Player2: {playerTwoName}</Text>
        <Text style={styles.points}>Points: 100</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.helpfulText}>Guess the word based on the hints below.</Text>
        <Text style={styles.instructionText}>Write your answer in the box:</Text>
        <TextInput
          style={styles.input}
          placeholder="Your answer..."
          onChangeText={setAnswer}
          value={answer}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameOver')}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PlayerScreen;
