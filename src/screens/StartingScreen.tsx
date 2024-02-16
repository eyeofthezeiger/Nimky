import React, { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';

type StartingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type StartingScreenProps = {
    navigation: StartingScreenNavigationProp;
}

const StartingScreen: React.FC<StartingScreenProps> = ({ navigation }) => {
    const [playerOneName, setPlayerOneName] = useState('Player 1');
    const [playerTwoName, setPlayerTwoName] = useState('Player 2');
    const [modalVisible, setModalVisible] = useState(false);

    const playerOneRef = useRef<TextInput>(null);
    const playerTwoRef = useRef<TextInput>(null);
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>Nimky</Text>
        <Text style={styles.subTitle}>Remember your people</Text>
        {/* <Text style={styles.helpfulText}>
        Welcome to the Name Chain Game! Your goal is to come up with a person's name that begins with a specific letter. Quick thinking and creativity are your best tools.
        </Text>
        <Text style={styles.instructionText}>
        Here's how to play:
        </Text>
        <Text style={styles.instructionText}>
            - If it's your first turn, start with any person's first name that begins with the given letter.
        </Text>
        <Text style={styles.instructionText}>
            - On subsequent turns, your letters for the first and last name are determined by the last letters of the previous answers.
        </Text>
        <Text style={styles.instructionText}>
            Earning Points:
        </Text>
        <Text style={styles.instructionText}>
            - Earn 5 points if the last name you enter starts with the same letter as the ending of the previous answer's last name.
        </Text>
        <Text style={styles.instructionText}>
            - Otherwise, you earn 3 points for a valid guess.
        </Text>
        <Text style={styles.instructionText}>Timer:</Text>
        <Text style={styles.instructionText}>
            Each turn has a 30-second timer. Be quick, or the game will be over!
        </Text>
        <Text style={styles.instructionText}>
            Each correctly answered turn will add 5 seconds to the clock!
        </Text> */}
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>How to Play</Text>
        </TouchableOpacity>
        <TextInput
            ref={playerOneRef}
            style={styles.input}
            placeholder='Enter Player 1 Name...'
            onChangeText={setPlayerOneName}
            onSubmitEditing={() => playerTwoRef.current?.focus()}
        />
        <TextInput
        ref={playerTwoRef}
            style={styles.input}
            placeholder='Enter Player 2 Name...'
            onChangeText={setPlayerTwoName}
            onSubmitEditing={() => navigation.navigate('Game', {
                playerOneName,
                playerTwoName
            })}
        />
      </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game', {
        playerOneName,
        playerTwoName
      })}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <Text style={styles.modalText}>How to Play</Text>
        <Text style={styles.modalInstructionText}>
        Welcome to the Name Chain Game! Your goal is to come up with a person's name that begins with a specific letter. Quick thinking and creativity are your best tools.
        {"\n\n"}Here's how to play:
        {"\n"}- If it's your first turn, start with any person's first name that begins with the given letter.
        {"\n"}- On subsequent turns, your letters for the first and last name are determined by the last letters of the previous answers.
        {"\n\n"}Earning Points:
        {"\n"}- Earn 5 points if the last name you enter starts with the same letter as the ending of the previous answer's last name.
        {"\n"}- Otherwise, you earn 3 points for a valid guess.
        {"\n\n"}Timer:
        {"\n"}Each turn has a 30-second timer. Be quick, or the game will be over!
        {"\n"}Each correctly answered turn will add 5 seconds to the clock!
        </Text>
        <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
        >
            <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        </View>
        </View>
        </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20, // Adjust based on your screen's design
    paddingBottom: 35, // Gives some space at the bottom for the button
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50 // Centers the titles vertically
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Gives some space between the main title and subtitle
  },
  subTitle: {
    fontSize: 18,
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Match the button width for consistency
    borderRadius: 5, // Optional: round corners
  },
  button: {
    width: '80%', // Adjust based on your design
    backgroundColor: '#007bff', // Example button color
    padding: 15, // Adjust padding for button size
    borderRadius: 5, // Rounds the corners of the button
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalInstructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

export default StartingScreen;
