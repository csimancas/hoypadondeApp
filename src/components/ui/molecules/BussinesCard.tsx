import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Label from '../atoms/Label';


type BussinesCardProps = {
    name: string;
    location: string;
    schedule: string;
};

const BussinesCard = ({ name, location, schedule }: BussinesCardProps) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://picsum.photos/150' }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Label variant="title" style={styles.title}>
                    {name}
                </Label>
                <Label variant="content" style={styles.content}>
                    {location}
                </Label>
                <Label variant="content" style={styles.content}>
                    {schedule}
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
