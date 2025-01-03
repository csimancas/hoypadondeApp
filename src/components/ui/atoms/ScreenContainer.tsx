import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type ScreenContainerProps = {
    children: React.ReactNode;
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
    const backgroundColor =  '#1A242F';

    return (
        <SafeAreaProvider style={[styles.container, { backgroundColor }]}>
                {children}
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});

export default ScreenContainer;
