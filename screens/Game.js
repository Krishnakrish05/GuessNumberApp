import React,{useState,useRef,useEffect} from "react";
import {View,Text,StyleSheet, Button,Alert, Dimensions} from "react-native";
import Number from "../components/Number";
import Card from "../components/Card"
import BodyText from "../components/BodyText"
import colors from "../constant/colors";
import {Ionicons} from "@expo/vector-icons"
const generateRandomBetween=(min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const random=Math.floor(Math.random()*(max-min))+min;
    if(random===exclude){
        return generateRandomBetween(min,max,exclude)
    }else{
        return random
    }
}

const  Game=props=>{
    const[currentGuess,setCurrentGuess]=useState(generateRandomBetween(1,100,props.userChoice));
    const [rounds,setRounds]=useState(0)
    const currentLow=useRef(1);
    const currentHigh=useRef(100);

    const{userChoice,onGameOver}=props

    useEffect(()=>{
        if(currentGuess===userChoice){
            onGameOver(rounds)
        }
    },[currentGuess,userChoice,onGameOver])

    const nextGuess=direction=>{
        if((direction==="lower"&& currentGuess<props.userChoice)|| (direction==="greater" && currentGuess>props.userChoice)){
            Alert.alert("Wrong choice given","Help me to Guess correct number!So play correctly",[{text:"Sorry",style:"cancel",}])
              return;
        }
        if(direction==="lower"){
            currentHigh.current=currentGuess
        }else{
            currentLow.current=currentGuess
        }
      const nextnumber =  generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
      setCurrentGuess(nextnumber)
      setRounds(curRounds=>curRounds+1)
   }
    return (
        <View style={styles.screen}>
            <BodyText>
                Opponent Guess
            </BodyText>
            <Number>{currentGuess}</Number>
            <Card style={styles.Button}>
      <Ionicons name="md-remove" size={28} onPress={nextGuess.bind(this,"lower")} color={colors.primary}  />     
    <Ionicons name="md-add" size={28} onPress={nextGuess.bind(this,"greater")} color={colors.secondary}  />

            </Card>
        </View>
    )

}
const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center"
    },
    Button:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:Dimensions.get("window").height>600?20:10, //20
        width:"60%",
        maxWidth:"80%"

    }

})
export default Game;