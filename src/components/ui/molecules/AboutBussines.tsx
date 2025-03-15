import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import Label from '../atoms/Label';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DollarIconSVG from '../../../utils/svg/DollasIcon';
import OpenTag from '../atoms/OpenTag';
import useBusinessStore from '../../../store/bussinesStore';
import BussinesImgCarousel from '../atoms/BussinesImgCarousel';

interface AboutBussinesProps {
    name: string;
    description: string;
    location: string;
    opening_hours: string;
}

const { width } = Dimensions.get('window');

const AboutBussines: React.FC<AboutBussinesProps> = ({ name, description, location, opening_hours }) => {
    const { selectedBusiness } = useBusinessStore();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setActiveIndex(index);
    };

    const parsedAddress = `${selectedBusiness.address.street} ${selectedBusiness.address.number} ${selectedBusiness.address.neighborhood}, ${selectedBusiness.address.city}, ${selectedBusiness.address.state}`;

    return (
        <View style={styles.container}>
            <View style={styles.aboutBussines}>
                <Label variant="title2" style={styles.title}>Acerca del negocio</Label>
                <OpenTag />
            </View>

            <BussinesImgCarousel img={selectedBusiness.images}/>

            {/* <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={width}
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false, listener: handleScroll }
                )}
                scrollEventThrottle={16}
            >
                {selectedBusiness.images.map((img, index) => (
                    <View style={{padding: 3}}>
                        <Image key={index} resizeMode='cover' source={{ uri: img }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.pagination}>
                {selectedBusiness.images.map((_, index) => (
                    <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                ))}
            </View> */}

            <Label variant="content2" style={styles.description}>{selectedBusiness.description}</Label>

            <View style={styles.row}>
                <AntDesign name="clockcircleo" size={16} color="#1A242F" />
                <Label variant="content2" style={styles.text}>{opening_hours}</Label>
            </View>

            <View style={styles.row}>
                <DollarIconSVG fillColor={'#1A242F'} />
                <Label variant="content2" style={styles.text}>Rango de precio</Label>
            </View>

            <View style={styles.row}>
                <MaterialIcon name="category" size={16} color={'#1A242F'} />
                <Label variant="content2" style={styles.text}>{selectedBusiness.category}</Label>
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
