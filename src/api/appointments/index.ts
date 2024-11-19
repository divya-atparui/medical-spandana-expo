import { generateMockAppointmentSlots } from "@/mocks/appointments";


export const getAppointmentSlots = async (
  doctorId: number,
  date: string
): Promise<AppointmentSlotsResponse> => {
  // In the future, replace this with an actual API call
  return generateMockAppointmentSlots(doctorId, date);
};