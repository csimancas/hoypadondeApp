import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import Label from '../atoms/Label';

interface PromotionDetailModalProps {
  visible: boolean;
  onClose: () => void;
  promotion: {
    title: string;
    subtitle?: string;
    description?: string;
    days: string[];
    time_range: string;
    valid_from: any;
    valid_until: any;
    discount_value?: string;
    terms_conditions?: string;
    place_name?: string;
  };
}

const PromotionDetailModal = ({
  visible,
  onClose,
  promotion,
}: PromotionDetailModalProps) => {
  // Formatear fechas de validez
  const formatDate = (timestamp: any) => {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'dd MMMM yyyy', {locale: es});
  };

  const getDaysString = (days: string[]) => {
    if (days.length === 7) {
      return 'Todos los días';
    }
    return days.join(', ');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#12171D" />
            </TouchableOpacity>
            <Label variant="title" style={styles.modalTitle}>
              Detalle de Promoción
            </Label>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.promotionHeader}>
              <View style={styles.promoIconContainer}>
                <MaterialCommunityIcons
                  name="percent"
                  size={40}
                  color="white"
                />
              </View>
              <Text style={styles.promoTitle}>{promotion.title}</Text>
              {promotion.subtitle && (
                <Text style={styles.promoSubtitle}>{promotion.subtitle}</Text>
              )}
              {promotion.place_name && (
                <View style={styles.placeContainer}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={16}
                    color="#12171D"
                  />
                  <Text style={styles.placeText}>{promotion.place_name}</Text>
                </View>
              )}
            </View>

            <Divider style={styles.divider} />

            {promotion.discount_value && (
              <View style={styles.infoSection}>
                <Label variant="subtitle">Descuento</Label>
                <Text style={styles.infoText}>{promotion.discount_value}</Text>
              </View>
            )}

            <View style={styles.infoSection}>
              <Label variant="subtitle">Días válidos</Label>
              <Text style={styles.infoText}>
                {getDaysString(promotion.days)}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Label variant="subtitle">Horario</Label>
              <Text style={styles.infoText}>{promotion.time_range}</Text>
            </View>

            <View style={styles.infoSection}>
              <Label variant="subtitle">Periodo de validez</Label>
              <Text style={styles.infoText}>
                Desde: {formatDate(promotion.valid_from)}
              </Text>
              <Text style={styles.infoText}>
                Hasta: {formatDate(promotion.valid_until)}
              </Text>
            </View>

            {promotion.description && (
              <View style={styles.infoSection}>
                <Label variant="subtitle">Descripción</Label>
                <Text style={styles.infoText}>{promotion.description}</Text>
              </View>
            )}

            {promotion.terms_conditions && (
              <View style={styles.infoSection}>
                <Label variant="subtitle">Términos y condiciones</Label>
                <Text style={styles.infoText}>
                  {promotion.terms_conditions}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.actionsContainer}>
            <Button
              mode="contained"
              onPress={onClose}
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}>
              Cerrar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  scrollView: {
    maxHeight: '80%',
  },
  promotionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  promoIconContainer: {
    backgroundColor: '#12171D',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#12171D',
    marginBottom: 5,
  },
  promoSubtitle: {
    fontSize: 16,
    color: '#6D6D6D',
    textAlign: 'center',
    marginBottom: 5,
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  placeText: {
    fontSize: 14,
    color: '#12171D',
    marginLeft: 5,
  },
  divider: {
    marginVertical: 15,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  infoSection: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#4D4D4D',
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#12171D',
  },
  actionButtonLabel: {
    fontSize: 16,
    color: 'white',
    padding: 5,
  },
});

export default PromotionDetailModal;
