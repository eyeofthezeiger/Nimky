import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';
import { RouteProp } from '@react-navigation/native';

type PlayerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Game'>

// Props type definition for component, assuming scores are passed as props
type PlayerScreenProps = {
    navigation: PlayerScreenNavigationProp;
    route: PlayerScreenRouteProp;
};

const PlayerScreen: React.FC<PlayerScreenProps> = ({navigation, route}) => {
    const {playerOneName, playerTwoName } = route.params;
    const [currentPlayer, setCurrentPlayer] = useState(playerOneName);
    const [initialLetter] = useState(generateRandomLetter);
    const [currentFirstName, setCurrentFirstName] = useState('');
    const [currentLastName, setCurrentLastName] = useState('');
    const [previousFirstName, setPreviousFirstName] = useState('');
    const [previousLastName, setPreviousLastName] = useState('');
    const [firstAnswerLetter, setFirstAnswerLetter] = useState('');
    const [lastAnswerLetter, setLastAnswerLetter] = useState('');
    const [turnNumber, setTurnNumber] = useState(0);
    const [playerOnePoints, setPlayerOnePoints] = useState(0);
    const [playerTwoPoints, setPlayerTwoPoints] = useState(0);
    const [points, setPoints] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);

    const firstNameRef = useRef<TextInput>(null);
    const lastNameRef = useRef<TextInput>(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else {
            navigation.navigate('GameOver', {playerOneName, playerTwoName, playerOnePoints, playerTwoPoints, points});
        }

    }, [timeLeft, navigation]);

    useEffect(() => {
        const today = new Date();
        const isValentinesDay = today.getMonth() === 1 && today.getDate() === 14;
        const isMattNikki = playerOneName.trim().toUpperCase() === 'MATT' && playerTwoName.trim().toUpperCase() === 'NIKKI';
        const isNikkiMatt = playerOneName.trim().toUpperCase() === 'NIKKI' && playerTwoName.trim().toUpperCase() === 'MATT';
        const isNikkiAndMatt = isMattNikki || isNikkiMatt;
        if (turnNumber === 5 && isValentinesDay && isNikkiAndMatt) {
            alert('Happy Valentines Day Nikki <3 <3 <3 !!! Love you so much :)')
        }
    }, [turnNumber]);

    const handleEnterPress = () => {

        // Helper function to normalize text for comparison
        const normalizeText = (text: string) => 
            text.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[\s'-\.]/g, '') // Remove spaces, hyphens, apostrophes, and periods
            .toUpperCase();

        // Validate input presence
        if (!currentFirstName.trim() || !currentLastName.trim()) {
            alert(`Please enter both a first name and last name`);
            return;
        }

        // Normalize input and required letter
        const normalizedFirstName = normalizeText(currentFirstName);
        const normalizedLastName = normalizeText(currentLastName);
        const requiredFirstNameLetter = previousFirstName ? firstAnswerLetter : initialLetter;
        const normalizedRequiredLetter = normalizeText(requiredFirstNameLetter);

        // Validate input starts with the required letter
        if (!normalizedFirstName.trim().toUpperCase().startsWith(normalizedRequiredLetter)) {
            alert(`The first name must start with the letter "${requiredFirstNameLetter}"`);
            return;
        }
        
        // Set previous names for next turn
        setPreviousFirstName(currentFirstName);
        setPreviousLastName(currentLastName);

        // Dtermine letters for validation and randomization
        const firstNameLetter = normalizedLastName[0];
        const randomIndex = Math.floor(Math.random() * normalizedFirstName.length);
        const lastNameLetter = normalizedFirstName[randomIndex];

        // Update answer letter state
        setFirstAnswerLetter(firstNameLetter);
        setLastAnswerLetter(lastNameLetter);

        // Calculate points awarded for this turn
        const pointsAwarded = currentLastName.trim().toUpperCase().startsWith(lastAnswerLetter) && turnNumber > 0 ? 5 : 3;

        // Update Player Points
        if (currentPlayer === playerOneName) {
            setPlayerOnePoints(playerOnePoints + pointsAwarded);
        } else if (currentPlayer === playerTwoName) {
            setPlayerTwoPoints(playerTwoPoints + pointsAwarded);
        }

        setPoints(points + pointsAwarded);
        setCurrentFirstName('');
        setCurrentLastName('');
        setCurrentPlayer(currentPlayer === playerOneName ? playerTwoName : playerOneName);
        setTimeLeft(timeLeft + 5);
        setTurnNumber(turnNumber + 1);
    };

    function generateRandomLetter() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
        <View style={styles.topBar}>
            <Text style={styles.timer}>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</Text>
            <Text style={styles.header}> {currentPlayer} you are up! </Text>
            <Text style={styles.points}>Points: {points}</Text>
        </View>
        <View style={styles.content}>
            <Text style={styles.helpfulText}>{previousFirstName + ' ' + previousLastName}</Text>
            <Text style={styles.helpfulText}>{!previousFirstName ? 'Think of a person you know whose first name start with the letter ' + initialLetter : 'Think of a person you know who’s first name starts with the last letter of last rounds first name ' + previousFirstName}</Text>
            <Text style={styles.helpfulText}>{previousLastName && 'test '}</Text>

            <Text style={styles.instructionText}>In the box below type that person’s first and last name</Text>
            <Text style={styles.instructionText}>first name starting letter: {firstAnswerLetter}</Text>
            <Text style={styles.instructionText}>(Bonus Points) last name starting letter: {lastAnswerLetter}</Text>
            <TextInput
            ref={firstNameRef}
            style={styles.input}
            placeholder="Enter first name..."
            onChangeText={setCurrentFirstName}
            value={currentFirstName}
            onSubmitEditing={() => lastNameRef.current?.focus()}
            />
            <TextInput
            ref={lastNameRef}
            style={styles.input}
            placeholder="Enter last name..."
            onChangeText={setCurrentLastName}
            value={currentLastName}
            onSubmitEditing={handleEnterPress}
            />
            <TouchableOpacity style={styles.button} onPress={handleEnterPress}>
            <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
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
