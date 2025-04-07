import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import ScheduleAccordion from '../atoms/ScheduleDays';
import Label from '../atoms/Label';
import commonFunctions from '../../../utils/common';
import AddFavBusiness from '../atoms/AddFavBussines';

const noImage = require('../../../assets/noimageAvailable.jpg');
type BussinesCardProps = {
  bussinesId: string;
  name: string;
  location: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  opening_hours: OpeningHours;
  image?: string[];
  action: () => void;
};

type OpeningHours = {
  [key: string]: {open: string; close: string};
};

const {getTodaySchedule} = commonFunctions();

const BussinesCard = ({
  name,
  location,
  opening_hours,
  image,
  action,
  bussinesId,
}: BussinesCardProps) => {
  const todaySchedule = getTodaySchedule(opening_hours);
  const screenWidth = Dimensions.get('window').width - 42;
  const parsedAddress = `${location?.street}${location?.number}, Col.${location?.neighborhood} ${location?.city}, ${location?.state}`;

  return (
    <Pressable style={styles.container} onPress={action}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.imageContainer, {width: screenWidth}]}>
        <AddFavBusiness businessId={bussinesId} />
        {image?.length === 0 ? (
          <Image
            source={noImage}
            style={[styles.image, {width: screenWidth}]}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{uri: image}}
            style={[styles.image, {width: screenWidth}]}
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
    shadowOffset: {width: 0, height: 2},
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
