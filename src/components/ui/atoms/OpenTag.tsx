import React from 'react';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


interface OpenTagProps {
    open?: boolean;
}

const OpenTag = ({open}: OpenTagProps) => {
    return (
        <View style={styles.containerScreen}>
            <Icon name={open ? 'checkcircle' : 'closecircle'} size={14} color="#1A242F" />
            <Label variant="content2" style={{color: '#1A242F', marginLeft: 5}}>{open ? 'Abierto' : 'Cerrado'}</Label>
        </View>
    );
};

const styles = StyleSheet.create({
    containerScreen: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 70,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F1EEF6',
        borderWidth: 1,
        borderColor: '#1A242F',
    },
});

export default OpenTag;