import React from 'react';
import { View, ScrollView, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import ScheduleAccordion from '../atoms/ScheduleDays';
import Label from '../atoms/Label';



const noImage = require('../../../assets/noimageAvailable.jpg');
type BussinesCardProps = {
  name: string;
  location: string;
  opening_hours: OpeningHours;
  image?: string[];
  action: () => void;
};

type OpeningHours = {
  [key: string]: { open: string; close: string };
};

const formatTime = (time: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convierte 0 o 12 a 12, y las demás a 1-11
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const isWithinSchedule = (open: string, close: string): boolean => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const [openHours, openMinutes] = open.split(':').map(Number);
  const openTime = openHours * 60 + openMinutes; 

  const [closeHours, closeMinutes] = close.split(':').map(Number);
  const closeTime = closeHours * 60 + closeMinutes; 

  return currentMinutes >= openTime && currentMinutes < closeTime;
};

const getTodaySchedule = (opening_hours: OpeningHours): string => {
  const daysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysOfWeekEs = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  const today = new Date().getDay();
  const todayKeyEn = daysOfWeekEn[today];
  const todayKeyEs = daysOfWeekEs[today];

  const schedule = opening_hours[todayKeyEn];

  if (!schedule || schedule.open === '' || schedule.close === '') {
    return `Cerrado`;
  }

  const openTime = formatTime(schedule.open);
  const closeTime = formatTime(schedule.close);
  const status = isWithinSchedule(schedule.open, schedule.close) ? 'Abierto' : 'Cerrado';
  
  if (status === 'Abierto') {
   
    return `${openTime} - ${closeTime} ${status}`;
  } else {
    return `Cerrado`
  }
};



const BussinesCard = ({ name, location, opening_hours, image, action }: BussinesCardProps) => {
  
  const todaySchedule = getTodaySchedule(opening_hours);
  const screenWidth = Dimensions.get('window').width - 42;
  const parsedAddress = `${location?.street}${location?.number}, Col.${location?.neighborhood} ${location?.city}, ${location?.state}`;
  
  return (
    <Pressable style={styles.container} onPress={action}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.imageContainer, { width: screenWidth }]}
      >
      {image?.length === 0 ? (
        <Image
          source={noImage}
          style={[styles.image, { width: screenWidth }]}
          resizeMode="cover"
        />
      ) : (
      <Image
        source={{ uri: image[1] }}
        style={[styles.image, { width: screenWidth }]}
        resizeMode="cover"
      />  
      )}
      </ScrollView>
      <View style={styles.infoContainer}>
        <Label variant="title" style={styles.title}>
          {name}
        </Label>
        <Label variant="content" style={styles.content}>
          {parsedAddress}
        </Label>
        <Label variant="content" style={styles.content}>
          {todaySchedule}
        </Label>
      </View>
    </Pressable>
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
  imageContainer: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
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
