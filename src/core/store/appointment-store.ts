import { create } from 'zustand';

import { generateMockAppointmentSlots } from '@/mocks/appointments';


interface AppointmentStore {
  selectedDate: string | null;
  selectedDoctor: number | null;
  appointmentSlots: AppointmentSlots | null;
  selectedTimeSlot: AppointmentTimeSlot | null;
  setSelectedDate: (date: string) => void;
  setSelectedDoctor: (doctorId: number) => void;
  fetchAppointmentSlots: () => void;
  selectTimeSlot: (timeSlot: AppointmentTimeSlot) => void;
  resetSelection: () => void;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  selectedDate: null,
  selectedDoctor: null,
  appointmentSlots: null,
  selectedTimeSlot: null,

  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedDoctor: (doctorId) => set({ selectedDoctor: doctorId }),

  fetchAppointmentSlots: () => {
    const { selectedDate, selectedDoctor } = get();
    if (selectedDate && selectedDoctor) {
      const mockResponse = generateMockAppointmentSlots(selectedDoctor, selectedDate);
      set({ appointmentSlots: mockResponse.data[0] });
    }
  },

  selectTimeSlot: (timeSlot) => set({ selectedTimeSlot: timeSlot }),

  resetSelection: () => set({
    selectedDate: null,
    selectedDoctor: null,
    appointmentSlots: null,
    selectedTimeSlot: null,
  }),
}));