import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Label from '../atoms/Label';
import AntDesing from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DollarIconSVG from '../../../utils/svg/DollasIcon';
import OpenTag from '../atoms/OpenTag';

const AboutBussines = () => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
            }}>
                <Label variant="title2" style={{color: '#1A242F', fontWeight: '600',}}>Acerca del negocio</Label>
                <OpenTag />
            </View>
            <Image 
                style={styles.image}
                source={{uri: 'https://picsum.photos/200/300'}} 
            />
            <Label variant="content2" style={{color: '#1A242F', marginTop: 10}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore delectus dolorum non! Exercitationem sunt provident, et beatae quam laborum cupiditate quo ratione. Tempore totam inventore quam? Perspiciatis temporibus vitae dignissimos.
            </Label>

            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                <AntDesing name="clockcircleo" size={16} color="#1A242F" />
                <Label variant="content2" style={{color: '#1A242F', marginLeft: 5}}>
                    10am - 10pm (Hoy)
                </Label>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <DollarIconSVG fillColor={'#1A242F'}/>
                <Label variant="content2" style={{color: '#1A242F', marginLeft: 5}}>
                    10am - 10pm (Hoy)
                </Label>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <MaterialIcon name="category" size={16} color={'#1A242F'} />
                <Label variant="content2" style={{color: '#1A242F', marginLeft: 5}}>
                    Validar categoria si es negocio o restaurante
                </Label>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <MaterialIcon name="directions" size={16} color={'#1A242F'} />
                <Label variant="content2" style={{color: '#1A242F', marginLeft: 5}}>
                    10am - 10pm (Hoy)
                </Label>
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
    image: {
        marginTop: 10,
        width: '100%',
        height: 210,
        borderRadius: 10,
    }

});

export default AboutBussines;
