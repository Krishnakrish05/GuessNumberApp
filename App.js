import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'
import StartGame from "./screens/StartGame"
import Game from "./screens/Game"
import GameOver from "./screens/GameOver"
import * as Font from 'expo-font'
import {AppLoading} from "expo"

const fetchFonts=()=>{
 return  Font.loadAsync({
    'open-sans': require ('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require ('./assets/fonts/OpenSans-Bold.ttf')

  })
}


export default function App() {
  const [userNumber,setUserNumber]=useState();
  const [guessRounds,setGuessRounds]=useState(0);
  const [dataLoaded,setDataLoaded]=useState(false)

  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)} onError={(err)=>console.log(err)} />
  }

  const NewGameHandler=()=>{
    setGuessRounds(0)
    setUserNumber(null)
  }
  const StartGameHandler=selectedNumber=>{
    setUserNumber(selectedNumber);
    
  };

  const GameOverHandler=numofRounds=>{
    setGuessRounds(numofRounds)

  }
  let content= <StartGame onStartGame={StartGameHandler} />
  if(userNumber&& guessRounds<=0){
    content=<Game userChoice={userNumber} onGameOver={GameOverHandler} />
  }else if(guessRounds>0){
    content=<GameOver roundsNumber={guessRounds} userNumber={userNumber} onRestart={NewGameHandler}/>
  }
  return (
    <View style={styles.screen} >
      <Header title="Guess A Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
  
});
