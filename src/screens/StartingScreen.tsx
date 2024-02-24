import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigationTypes';

type StartingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface StartingScreenProps {
  navigation: StartingScreenNavigationProp;
}


const StartingScreen: React.FC<StartingScreenProps> = ({ navigation }) => {
  const [howToPlayVisible, setHowToPlayVisible] = useState(false);
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  

  return (
    <LinearGradient
      colors={['#F87F6F', '#FAB77B', '#FBDC93']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.mainTitle}>Nimky</Text>
            <Text style={styles.subTitle}>Remember your people</Text>
            <View style={styles.mainButtonContainer}>
                <TouchableOpacity style={styles.startGameButton} onPress={() => setStartModalVisible(true)}>
                <Text style={styles.mainButtonText}>START</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.howToPlayButton} onPress={() => setHowToPlayVisible(true)}>
                <Text style={styles.mainButtonText}>HOW TO PLAY</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* How to Play Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={howToPlayVisible}
          onRequestClose={() => setHowToPlayVisible(!howToPlayVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>HOW TO PLAY</Text>
              {/* How to play content goes here */}
              <Text style={styles.modalInstructionText}>
              {/* Welcome to the Name Chain Game! Your goal is to come up with a person's name that begins with a specific letter. Quick thinking and creativity are your best tools.
                {"\n\n"}Here's how to play:
                {"\n"}- If it's your first turn, start with any person's first name that begins with the given letter.
                {"\n"}- On subsequent turns, your letters for the first and last name are determined by the last letters of the previous answers.
                {"\n\n"}Earning Points:
                {"\n"}- Earn 5 points if the last name you enter starts with the same letter as the ending of the previous answer's last name.
                {"\n"}- Otherwise, you earn 3 points for a valid guess.
                {"\n\n"}Timer:
                {"\n"}Each turn has a 30-second timer. Be quick, or the game will be over!
                {"\n"}Each correctly answered turn will add 5 seconds to the clock! */}
                Welcome to the Name Chain Game! Start by naming a person with a first name that matches the given letter. Each round, use the last letter of the previous name to start the next. 
                Score points by matching the first or last names correctly: 3 points for first name only, 5 points for first and last name. You have 30 seconds per turn, but each correct answer adds 5 seconds. Let's play!
                </Text>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => setHowToPlayVisible(!howToPlayVisible)}
              >
                <Text style={styles.buttonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Start Game Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={startModalVisible}
          onRequestClose={() => setStartModalVisible(!startModalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter Player Names</Text>
                    <TextInput
                    style={[styles.input, { width: '100%' }]} // Adjust width as needed
                    placeholder='Player 1 Name...'
                    placeholderTextColor='#000' // Improve visibility
                    onChangeText={setPlayerOneName}
                    value={playerOneName}
                    />
                    <TextInput
                    style={[styles.input, { width: '100%' }]} // Adjust width as needed
                    placeholder='Player 2 Name...'
                    placeholderTextColor='#000' // Improve visibility
                    onChangeText={setPlayerTwoName}
                    value={playerTwoName}
                    />
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonHalf]}
                        onPress={() => {
                        setStartModalVisible(!startModalVisible);
                        navigation.navigate('Game', { playerOneName, playerTwoName });
                        }}
                    >
                        <Text style={styles.buttonText}>START</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonHalf, styles.closeButton]}
                        onPress={() => setStartModalVisible(!startModalVisible)}
                    >
                        <Text style={styles.buttonText}>CLOSE</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTextColor: {
    color: '#806D5A'
  },
  screenBorder: {
    flex: 1,
    borderColor: '#806D5A', // Use the same color as your modal border
    borderWidth: 10, // Matching modal border width
    borderRadius: 20, // If you want rounded corners for the whole screen
    margin: 5, // Adjust as needed, creates space for the shadow
    shadowColor: '#F86657', // Matching modal shadow color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // Android shadow
    backgroundColor: 'transparent', // Ensure LinearGradient colors show through
  },
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  mainTitle: {
    fontFamily: 'Noteworthy', 
    fontSize: 100,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3F000F'
  },
  subTitle: {
    fontFamily: 'Noteworthy', 
    fontSize: 20,
    color: '#3F000F'
  },
  input: {
    fontFamily: 'Noteworthy', 
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#FFF'
  },
  button: {
    width: '80%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // Added to separate buttons and inputs
  },
  buttonText: {
    fontFamily: 'Noteworthy', 
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  mainButtonContainer: {
    width: '100%', // Full width to center buttons effectively
    alignItems: 'center', // Center buttons horizontally
    paddingBottom: 20, // Space at the bottom
    marginTop: 125
  },
  startGameButton: { // Styles for main screen buttons
    width: '90%', // Nearly full width
    marginHorizontal: '5%', // Center the button
    backgroundColor: '#AD7AFE',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  howToPlayButton: { // Styles for main screen buttons
    width: '90%', // Nearly full width
    marginHorizontal: '5%', // Center the button
    backgroundColor: '#769AFE',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mainButtonText: { // Text style for main buttons
    fontFamily: 'Noteworthy', 
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust as needed for layout
    width: '100%', // Ensure it matches the modal width
    paddingTop: 15
  },
  buttonHalf: {
    width: '48%', // Adjust so two buttons fit side by side with a little space
    backgroundColor: '#AD7AFE', // Example color
    // Other button styles...
  },
  closeButton: {
    backgroundColor: '#769AFE'
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: '#FFF5E1',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderColor: '#806D5A',
    borderWidth: 10,
    shadowColor: '#F86657',
    shadowOffset: { width: 6, height: 9 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    marginTop: -150
  },
  modalText: {
    fontFamily: 'Noteworthy', 
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#70594A'
  },
  modalInstructionText: {
    fontFamily: 'Noteworthy', 
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#70594A'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

export default StartingScreen;