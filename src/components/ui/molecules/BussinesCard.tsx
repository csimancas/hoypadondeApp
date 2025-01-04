import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Label from '../atoms/Label';

const BussinesCard = () => {  
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://picsum.photos/150' }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Label variant="title" style={styles.title}>
                    Nombre de restaurante
                </Label>
                <Label variant="content" style={styles.content}>
                    Ubicación
                </Label>
                <Label variant="content" style={styles.content}>
                    Horario
                </Label>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 10,
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    infoContainer: {
        padding: 10,
        marginTop: 5,
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
    },
    content: {
        color: 'black',
    },
});

export default BussinesCard;
