import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from './Label';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import PromotionDetailModal from '../molecules/PromotionDetailModal';

interface PromoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  days: string[];
  time_range: string;
  action?: () => void;
  valid_from: any;
  valid_until: any;
  discount_value?: string;
  terms_conditions?: string;
  place_name?: string;
}

const DAYS_MAPPING = {
  Lunes: 'L',
  Martes: 'M',
  Miércoles: 'X',
  Jueves: 'J',
  Viernes: 'V',
  Sábado: 'S',
  Domingo: 'D',
};

const WEEK_DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const PromoCard = (props: PromoCardProps) => {
  const {title, subtitle, days, time_range, action, valid_from, valid_until} =
    props;

  const [modalVisible, setModalVisible] = useState(false);

  const activeDays = days.map(day => DAYS_MAPPING[day] || '');

  const formatDate = (timestamp: any) => {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'dd/MM/yyyy', {locale: es});
  };

  const validityPeriod = `Válido: ${formatDate(valid_from)} - ${formatDate(
    valid_until,
  )}`;

  const renderDays = () => {
    return WEEK_DAYS.map((day, index) => {
      const isActive = activeDays.includes(day);
      return (
        <View key={index} style={styles.dayContainer}>
          <View
            style={[
              styles.dayCircle,
              isActive ? styles.activeDayCircle : styles.inactiveDayCircle,
            ]}>
            <Text
              style={[
                styles.dayText,
                isActive ? styles.activeDayText : styles.inactiveDayText,
              ]}>
              {day}
            </Text>
          </View>
        </View>
      );
    });
  };

  const handleOpenDetails = () => {
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <MaterialCommunityIcons name="percent" size={32} color="white" />
        </View>

        <View style={styles.rightSection}>
          <Label
            style={styles.titleLabel}
            flexWrap="wrap"
            variant="content"
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Label>

          <View style={styles.infoRow}>
            <View style={styles.daysContainer}>{renderDays()}</View>
          </View>
          <Text style={styles.validityText}>{validityPeriod}</Text>
          <Button
            mode="text"
            onPress={handleOpenDetails}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            icon={() => (
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color="#12171D"
              />
            )}>
            Ver detalles
          </Button>
        </View>
      </View>

      <PromotionDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        promotion={props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    marginHorizontal: 16,
    marginVertical: 8,
    minHeight: 150,
    maxHeight: 150,
    position: 'absolute',
    left: 5,
    right: 0,
  },
  leftSection: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#12171D',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  rightSection: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  titleLabel: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 4,
  },
  validityText: {
    fontSize: 12,
    color: '#6D6D6D',
    marginBottom: 2,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayContainer: {
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDayCircle: {
    backgroundColor: '#12171D',
  },
  inactiveDayCircle: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dayText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
  inactiveDayText: {
    color: '#A0A0A0',
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    height: 40,
    padding: 0,
  },
  buttonLabel: {
    fontSize: 13,
    color: '#12171D',
    marginLeft: 0,
  },
});

export default PromoCard;
