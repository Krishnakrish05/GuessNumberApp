import React from "react";
import {StyleSheet,Text,View} from "react-native";
import colors from "../constant/colors"
import TitleText from "./TitleText"

const Header=props=>{
    return(
        <View style={styles.header}>
            <TitleText >
                {props.title}
            </TitleText>
        </View>
    )
};

const styles=StyleSheet.create({
    header:{
        width:"100%",
        height:90,
        paddingTop:35,
        backgroundColor:colors.primary,
        alignItems:"center",
        justifyContent:"center"
    },
    
})

export default Header;