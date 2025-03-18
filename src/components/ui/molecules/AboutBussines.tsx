import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import Label from '../atoms/Label';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DollarIconSVG from '../../../utils/svg/DollasIcon';
import OpenTag from '../atoms/OpenTag';
import useBusinessStore from '../../../store/bussinesStore';
import BussinesImgCarousel from '../atoms/BussinesImgCarousel';
import commonFunctions from '../../../utils/common';

interface AboutBussinesProps {
    address: {
        street: string,
        number: string,
        neighborhood: string,
        city: string,
        state: string;
    }
    description: string;
    opening_hours: string;
    images: [];
    categories: string; 
}

const { width } = Dimensions.get('window');

const AboutBussines: React.FC<AboutBussinesProps> = ({ address ,description, opening_hours, images, categories }) => {
    const {getTodaySchedule} = commonFunctions();
    const todaySchedule = getTodaySchedule(opening_hours);
    const parsedAddress = `${address.street} ${address.number} ${address.neighborhood}, ${address.city}, ${address.state}`;

    return (
        <View style={styles.container}>
            <View style={styles.aboutBussines}>
                <Label variant="title2" style={styles.title}>Acerca del negocio</Label>
                <OpenTag />
            </View>

            <BussinesImgCarousel img={images}/>

            <Label variant="content2" style={styles.description}>{description}</Label>

            <View style={styles.row}>
                <AntDesign name="clockcircleo" size={16} color="#1A242F" />
                <Label variant="content2" style={styles.text}>{todaySchedule}</Label>
            </View>

            <View style={styles.row}>
                <DollarIconSVG fillColor={'#1A242F'} />
                <Label variant="content2" style={styles.text}>Rango de precio</Label>
            </View>

            <View style={styles.row}>
                <MaterialIcon name="category" size={16} color={'#1A242F'} />
                <Label variant="content2" style={styles.text}>{categories}</Label>
            </View>

            <View style={styles.row}>
                <MaterialIcon name="directions" size={16} color={'#1A242F'} />
                <Label variant="content2" style={styles.text}>{parsedAddress}</Label>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    aboutBussines: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: '#1A242F',
        fontWeight: '600',
    },
    image: {
        width: width, // Ahora ocupa todo el ancho
        height: 210,
        borderRadius: 20,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#C4C4C4',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#1A242F',
    },
    description: {
        color: '#1A242F',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    text: {
        color: '#1A242F',
        marginLeft: 5,
    },
});

export default AboutBussines;
