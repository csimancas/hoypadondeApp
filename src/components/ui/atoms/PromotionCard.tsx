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

// Mapeo de días de la semana en español a sus iniciales
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

  // Convertir los días del array a sus iniciales
  const activeDays = days.map(day => DAYS_MAPPING[day] || '');

  // Formatear fechas de validez
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
            style={{width: '100%', fontWeight: 'bold'}}
            flexWrap="wrap"
            variant="content"
            ellipsizeMode={'tail'}>
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

// Mantenemos los mismos estilos que ya tenías
const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
  },
  leftSection: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#12171D',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  rightSection: {
    flex: 1,
    padding: 16,
    width: '75%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6D6D6D',
  },
  validityText: {
    fontSize: 12,
    color: '#6D6D6D',
    marginBottom: 4,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayContainer: {
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
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
    fontSize: 12,
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
  },
  buttonLabel: {
    fontSize: 14,
    color: '#12171D',
  },
});

export default PromoCard;
