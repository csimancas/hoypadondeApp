import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type ScreenContainerProps = {
    children: React.ReactNode;
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
    const scheme = useColorScheme();
    const backgroundColor = scheme === 'dark' ? '#1A242F' : '#EFE8D8';

    return (
        <SafeAreaProvider style={[styles.container, { backgroundColor }]}>
            <View >
                {children}
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    
});

export default ScreenContainer;
