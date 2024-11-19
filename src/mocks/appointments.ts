// src/mocks/appointments.ts


const generateConsistentRandomBoolean = (seed: number): boolean => {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * 10) > 2; // 80% chance of being available
};

export const generateMockAppointmentSlots = (
  doctorId: number,
  date: string
): AppointmentSlotsResponse => {
  const timeSlots: AppointmentTimeSlot[] = [];
  const startHour = 8;
  const endHour = 17;
  const intervalMinutes = 15;

  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay(); // 0 for Sunday, 1 for Monday, etc.

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endTimeDate = new Date(new Date(`2000-01-01T${startTime}`).getTime() + intervalMinutes * 60000);
      const endTime = `${endTimeDate.getHours().toString().padStart(2, '0')}:${endTimeDate.getMinutes().toString().padStart(2, '0')}`;

      const seed = doctorId * 10000 + dayOfWeek * 1000 + hour * 100 + minute;
      const isAvailable = generateConsistentRandomBoolean(seed);

      timeSlots.push({
        startTime,
        endTime,
        appointmentStatus: isAvailable ? 'AVAILABLE' : 'NOTAVAILABLE',
      });
    }
  }

  return {
    status: 200,
    message: "Appointment slots retrieved successfully.",
    data: [
      {
        appointmentDate: date,
        doctorId,
        appointmentTimeSlots: timeSlots,
      },
    ],
  };
};