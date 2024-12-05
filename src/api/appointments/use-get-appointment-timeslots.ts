// src/api/appointments/use-get-appointment-slots.ts

import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { generateMockAppointmentSlots } from '@/mocks/appointments';



type Response = AppointmentSlotsResponse;
type Variables = { doctorId: number; date: string };

export const useGetAppointmentSlots = createQuery<Response, Variables, AxiosError>({
  queryKey: ['appointmentSlots'],
  fetcher: ({ doctorId, date }) => {
    // For now, we'll use the mock data generator
    // In the future, replace this with an actual API call
    return Promise.resolve(generateMockAppointmentSlots(doctorId, date));
    
    // When switching to real API, use this:
    // return client.get(`/api/appointment/getAppointments-byDoctor-date/${doctorId}/${date}`)
    //   .then((response) => response.data);
  },
});
