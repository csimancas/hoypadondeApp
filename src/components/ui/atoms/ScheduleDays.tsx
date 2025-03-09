import React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

type OpeningHours = {
  [key: string]: { open: string; close: string };
};

interface ScheduleAccordionProps {
  openingHours: OpeningHours;
}

const ScheduleAccordion: React.FC<ScheduleAccordionProps> = ({ openingHours }) => {
  const daysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysOfWeekEs = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <View style={{ margin: 10 }}>
      <List.Accordion
        title="Horarios de atención"
        left={props => <List.Icon {...props} icon="calendar-clock" />}
      >
        {daysOfWeekEn.map((dayEn, index) => {
          const dayEs = daysOfWeekEs[index];
          const schedule = openingHours[dayEn];
          const isClosed = !schedule || schedule.open === '' || schedule.close === '';

          return (
            <List.Item
              key={dayEn}
              title={isClosed ? `Cerrado` : `Abierto de ${schedule.open} a ${schedule.close}`}
              left={props => <List.Icon {...props} icon={isClosed ? "close-circle" : "clock-outline"} />}
              titleStyle={{ fontSize: 16 }}
              description={dayEs}
            />
          );
        })}
      </List.Accordion>
    </View>
  );
};

export default ScheduleAccordion;