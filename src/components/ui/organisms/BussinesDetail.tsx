import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import OpenTag from "../atoms/OpenTag";
import AboutBussines from "../molecules/AboutBussines";
import AmenitiesCard from "../molecules/AmenitiesCard";
import PromotionsList from "../molecules/PromotionsList";
import MenusList from "../molecules/MenuList";
import Label from "../atoms/Label";



interface bussineNameProps{
    name?: string;
}

const BussinesName = ({name}: bussineNameProps) => {
    return (
        <View style={styles.bussinesTitleContainer}>
            <Label variant="title" style={{color: 'black'}}>{name}</Label>
            <OpenTag />
        </View>
    );
};



const BussinesDetail = () => {
    return (
        <ScrollView style={styles.containerScreen}>
            <BussinesName name={'Test bussines Name'}/>
            <AboutBussines />
            <AmenitiesCard />
            <PromotionsList />
            <MenusList />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerScreen: {
        backgroundColor: '#F0F0F0',
    },
    bussinesTitleContainer:{
        width: '100%',
        height: 80,
        backgroundColor: '#FFFFFF',
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default BussinesDetail;