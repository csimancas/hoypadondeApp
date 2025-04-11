import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type ViewType = 'businesses' | 'promotions';

interface ViewSelectorProps {
  selectedView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  selectedView,
  onViewChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedView === 'businesses'
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => onViewChange('businesses')}>
        <Text
          style={[
            styles.text,
            selectedView === 'businesses'
              ? styles.selectedText
              : styles.unselectedText,
          ]}>
          Negocios
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedView === 'promotions'
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => onViewChange('promotions')}>
        <Text
          style={[
            styles.text,
            selectedView === 'promotions'
              ? styles.selectedText
              : styles.unselectedText,
          ]}>
          Promociones
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 4,
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#6200EE',
    shadowColor: '#6200EE',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  unselectedButton: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  selectedText: {
    color: '#ffffff',
  },
  unselectedText: {
    color: '#666666',
  },
});

export default ViewSelector;
