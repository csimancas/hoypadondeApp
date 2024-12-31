import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

type ScreenContainerProps = {
    children: React.ReactNode;
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
    const scheme = useColorScheme();
    const backgroundColor = scheme === 'dark' ? '#1A242F' : '#EFE8D8';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: -200,
        marginBottom: 50,
    },
});

export default ScreenContainer;
