import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
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
    const [currentPlayer, setCurrentPlayer] = useState(playerOneName);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [previousAnswer, setPreviousAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            navigation.navigate('GameOver');
        }

    }, [timeLeft]);

    const handleEnterPress = () => {
        setPreviousAnswer(currentAnswer);
        setCurrentAnswer('');
        setCurrentPlayer(currentPlayer === playerOneName ? playerTwoName : playerOneName);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
            <Text style={styles.timer}>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</Text>
            <Text style={styles.header}> {currentPlayer} you are up! </Text>
            <Text style={styles.points}>Points: 100</Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.helpfulText}>Previous answer is {previousAnswer}</Text>
            <Text style={styles.instructionText}>Write your answer in the box:</Text>
            <TextInput
            style={styles.input}
            placeholder="Your answer..."
            onChangeText={setCurrentAnswer}
            value={currentAnswer}
            />
            <TouchableOpacity style={styles.button} onPress={handleEnterPress}>
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
