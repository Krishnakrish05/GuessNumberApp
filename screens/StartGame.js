import React,{useState,useEffect} from "react";
import {View,StyleSheet,Text,TextInput,Button,TouchableWithoutFeedback,Keyboard,Alert,Dimensions,ScrollView} from "react-native";
import Card from "../components/Card"
import colors from "../constant/colors"
import Input from "../components/Input"
import Number from '../components/Number'
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"

const StartGame=props=>{

    const [enteredValue,setEnteredValue]=useState('');
    const [confirmed,setConfirmed]=useState(false);
    const [selectNumber,setSelectNumber]=useState();
    const [buttonWidth,setButtonWidth]=useState(Dimensions.get("window").width/4);
    
     useEffect(()=>{
        const updateLayout=()=>{
            setButtonWidth(Dimensions.get("window").width/4)
        }
       Dimensions.addEventListener("change",updateLayout)
       return()=>{
           Dimensions.removeEventListener("change",updateLayout)
       }
     })

    const numberInputhandler=inputText=>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''))

    }

    const resetInputHandler=()=>{
        setEnteredValue("");
        setConfirmed(false);
    }

    const confirmInputHandler=()=>{
        const chosenNumber= parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99){
            Alert.alert("Invalid Input","Input Should be between 1-99",[{text:"Try Again",style:"destructive", onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectNumber(chosenNumber)
        setEnteredValue('');
        Keyboard.dismiss()

    };
    let ConfirmedOutput;
    if(confirmed){
    ConfirmedOutput=<Card style={styles.inputs}><Text>Chosen Number is </Text>
    <Number>{selectNumber}</Number>
    
    <Button title="Start" color={colors.primary} onPress={()=>{
        props.onStartGame(selectNumber)   }}/>
    </Card>
    }
    return(
        <ScrollView>
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
            
        }}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>
                Start a Game
            </TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input style={styles.input} maxLength={2} blurOnSubmit autoCorrect={false} keyboardType="number-pad" onChangeText={numberInputhandler} value={enteredValue}/>
                <View style={styles.buttonContainer}>
                   <View style={{width:buttonWidth}}> 
                   <Button title="Reset" onPress={resetInputHandler} color={colors.secondary}/></View>
                  <View style={{width:buttonWidth}}>
                      <Button title="Confirm" onPress={confirmInputHandler} color={colors.primary}/></View> 
                </View>
                </Card>
                {ConfirmedOutput}

        </View>
        </TouchableWithoutFeedback>
        </ScrollView>
    )

}

const styles =StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center",
    },
    title:{
        fontSize:22,
        marginVertical:10,
        fontFamily:"open-sans-bold"

    },
    inputContainer:{
        width:"80%",//250
       // maxWidth:"80%",
       minWidth:280,
        alignItems:"center",
       
    },
    buttonContainer:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
        paddingHorizontal:15

    },
    // button:{
    //     //width:77,
    //     width:Dimensions.get("window").width/4
    // },
    input:{
        width:50,
        textAlign:"center"
    },
    inputs:{
       marginTop:35,
       padding:40,
       paddingBottom:20,
       alignItems:"center",
       justifyContent:"space-between"
       
    },

})

export default StartGame;