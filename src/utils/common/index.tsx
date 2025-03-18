

const commonFunctions = () => {
    
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

    
    
    return {
        formatTime, isWithinSchedule, getTodaySchedule
    }
}

export default commonFunctions