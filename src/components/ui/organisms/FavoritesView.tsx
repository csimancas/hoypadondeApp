import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Selector from '../atoms/Selector';

const FavoriteView = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Selector />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FavoriteView;

