import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,Button,Image,Dimensions, ScrollView} from "react-native";
import colors from "../constant/colors";
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"
import Card from "../components/Card"


const GameOver=props=>{
    const[deviceWidth,setDeviceWidth]=useState(Dimensions.get("window").height)

useEffect(()=>{
    const updateLayout=()=>{
        setDeviceWidth(Dimensions.get("window").height)
        
    }
    Dimensions.addEventListener("change",updateLayout);
    return(()=>{
        Dimensions.removeEventListener('change',updateLayout)
    })
})

    if(deviceWidth<450){
     return(
          <View style={styles.screen1}> 
             
            <TitleText style={styles.font}>
                Game Over
            </TitleText>
           
    <BodyText style={styles.fonts1}> Number of Rounds : <Text style={styles.highlight}>{props.roundsNumber}</Text></BodyText>
    <BodyText style={styles.fonts1}>Your Number is : <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
    
   <View style={styles.btn1}>
        <Button title="New Game" color={colors.primary} onPress={props.onRestart}/>
        </View>
        </View>
        
     )  
    }
    return(
      
        <View style={styles.screen}> 
             <Card>
                 
            <TitleText style={styles.font}>
                Game Over
            </TitleText>
            
            <View style={styles.imageContainer}>
            <Image source={require('../assets/success1.png')} style={styles.image}
            resizeMode="contain"/></View>
           
    <BodyText style={styles.fonts}> Number of Rounds : <Text style={styles.highlight}>{props.roundsNumber}</Text></BodyText>
    <BodyText style={styles.fonts}>Your Number is : <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
    
   <View style={styles.btn}>
        <Button title="New Game" color={colors.primary} onPress={props.onRestart}/>
        </View>
        </Card>
       
        </View>
       
        
    )

}

const styles=StyleSheet.create({
    
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:Dimensions.get("window").height/20,
        
        

    },
    btn:{
        padding:16,
        
    },
    btn1:{
        padding:16,
        marginVertical:20
    },
    font:{
    fontSize:Dimensions.get("window").height<400?18:18,//20
   marginVertical:20,
   textAlign:"center"
  },
  fonts:{
    fontSize:Dimensions.get("window").height<400?16:18,//18
    textAlign:"center",
   marginVertical:Dimensions.get("window").height/60
   //marginVertical:8

  },
  fonts1:{
      fontSize:18,
      textAlign:"center",
      marginVertical:10


  },
//   imageContainer1:{
//         //borderRadius:175,
//         borderWidth:3,//3 
//         borderColor:'black',
//        // width:250,
//        // height:250,
//        width:Dimensions.get("window").width*0.3/8,
//        height:Dimensions.get("window").width*0.7/8,
//        borderRadius:Dimensions.get("window").width*0.7,
//        marginVertical:Dimensions.get("window").height/60,
//        overflow:"hidden",
//        paddingLeft:300
//   },
  imageContainer:{
    //borderRadius:175,
    borderWidth:3,//3
    borderColor:'black',
   // width:250,
   // height:250,
   width:Dimensions.get("window").width*0.7,
   height:Dimensions.get("window").width*0.7,
   borderRadius:Dimensions.get("window").width*0.7,
   marginVertical:Dimensions.get("window").height/100,
   overflow:"hidden",
    //marginVertical:30

  },
//   image1:{
//       width:"30%",
//       height:30,
//       minWidth:200,
//       alignItems:"center",
//       justifyContent:"center"

//   },
  image:{
      width:"100%",
      height:"100%",
      minWidth:250
      
  },
  highlight:{
      color:colors.primary,
      fontSize:18,
      fontFamily:"open-sans-bold"
  }

})

export default GameOver