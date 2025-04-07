interface DaySchedule {
  open: string;
  close: string;
  nextDay?: boolean;
}

interface OpeningHours {
  Monday?: DaySchedule;
  Tuesday?: DaySchedule;
  Wednesday?: DaySchedule;
  Thursday?: DaySchedule;
  Friday?: DaySchedule;
  Saturday?: DaySchedule;
  Sunday?: DaySchedule;
  [key: string]: DaySchedule | undefined;
}

const commonFunctions = () => {
  const formatTime = (time: string): string => {
    if (!time) {
      return '';
    }
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convierte 0 o 12 a 12, y las demás a 1-11
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const isWithinSchedule = (
    open: string,
    close: string,
    nextDay: boolean = false,
  ): boolean => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHours * 60 + currentMinutes;

    const [openHours, openMinutes] = open.split(':').map(Number);
    const openTime = openHours * 60 + openMinutes;

    const [closeHours, closeMinutes] = close.split(':').map(Number);
    const closeTime = closeHours * 60 + closeMinutes;

    if (nextDay) {
      // Si cierra al día siguiente y estamos antes de la medianoche
      if (currentTime >= openTime) {
        return true;
      }
      // Si cierra al día siguiente y estamos después de la medianoche
      if (currentTime < closeTime) {
        return true;
      }
      return false;
    } else {
      // Horario normal sin pasar al día siguiente
      return currentTime >= openTime && currentTime < closeTime;
    }
  };

  const getTodaySchedule = (opening_hours: OpeningHours): string => {
    const daysOfWeekEn = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const daysOfWeekEs = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];

    const today = new Date().getDay();
    const todayKeyEn = daysOfWeekEn[today];

    // También verificamos el día anterior para los establecimientos que cierran al día siguiente
    const yesterdayIndex = (today - 1 + 7) % 7;
    const yesterdayKeyEn = daysOfWeekEn[yesterdayIndex];

    const schedule = opening_hours[todayKeyEn];
    const yesterdaySchedule = opening_hours[yesterdayKeyEn];

    // Verificar si el lugar está abierto debido al horario del día anterior
    if (
      yesterdaySchedule &&
      yesterdaySchedule.nextDay &&
      yesterdaySchedule.open &&
      yesterdaySchedule.close
    ) {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHours * 60 + currentMinutes;

      const [closeHours, closeMinutes] = yesterdaySchedule.close
        .split(':')
        .map(Number);
      const closeTime = closeHours * 60 + closeMinutes;

      if (currentTime < closeTime) {
        // Todavía está abierto por el horario del día anterior
        const openTime = formatTime(yesterdaySchedule.open);
        const closeTime = formatTime(yesterdaySchedule.close);
        return `${openTime} - ${closeTime} (del día anterior) Abierto`;
      }
    }

    if (!schedule || schedule.open === '' || schedule.close === '') {
      return 'Cerrado';
    }

    const openTime = formatTime(schedule.open);
    const closeTime = formatTime(schedule.close);
    const nextDayText = schedule.nextDay ? '' : '';

    const status = isWithinSchedule(
      schedule.open,
      schedule.close,
      schedule.nextDay,
    )
      ? 'Abierto'
      : 'Cerrado';

    if (status === 'Abierto') {
      return `${openTime} - ${closeTime}${nextDayText} ${status}`;
    } else {
      return `Cerrado (Horario: ${openTime} - ${closeTime}${nextDayText})`;
    }
  };

  const isBusinessOpenNow = (opening_hours: OpeningHours): boolean => {
    const daysOfWeekEn = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const today = new Date().getDay();
    const todayKeyEn = daysOfWeekEn[today];

    // También verificamos el día anterior para los establecimientos que cierran al día siguiente
    const yesterdayIndex = (today - 1 + 7) % 7;
    const yesterdayKeyEn = daysOfWeekEn[yesterdayIndex];

    const schedule = opening_hours[todayKeyEn];
    const yesterdaySchedule = opening_hours[yesterdayKeyEn];

    // Verificar si el lugar está abierto debido al horario del día anterior
    if (
      yesterdaySchedule &&
      yesterdaySchedule.nextDay &&
      yesterdaySchedule.open &&
      yesterdaySchedule.close
    ) {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHours * 60 + currentMinutes;

      const [closeHours, closeMinutes] = yesterdaySchedule.close
        .split(':')
        .map(Number);
      const closeTime = closeHours * 60 + closeMinutes;

      if (currentTime < closeTime) {
        // Todavía está abierto por el horario del día anterior
        return true;
      }
    }

    // Si no hay horario hoy o está vacío, está cerrado
    if (!schedule || schedule.open === '' || schedule.close === '') {
      return false;
    }

    // Verificamos si está dentro del horario de hoy
    return isWithinSchedule(schedule.open, schedule.close, schedule.nextDay);
  };

  return {
    formatTime,
    isWithinSchedule,
    getTodaySchedule,
    isBusinessOpenNow, // Exportar la nueva función
  };
};

export default commonFunctions;
