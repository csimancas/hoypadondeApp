import React from 'react';
import {View, FlatList} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Label from '../atoms/Label';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface MoreInformationProps {
  data: string[];
}

const MoreInformation = ({data}: MoreInformationProps) => {
  return (
    <View style={styles.container}>
      <Label variant="title">Más información</Label>
      <FlatList
        removeClippedSubviews={false}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}} // Separa las columnas
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '48%',
              marginTop: 10,
            }}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              color="green"
              size={20}
              style={{marginRight: 4}}
            />
            <Label variant="content2">{item}</Label>
          </View>
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    marginTop: 10,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
};

export default MoreInformation;
