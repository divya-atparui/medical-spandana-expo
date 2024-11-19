interface Doctor {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  maxAppointmentsPerTimeSlot: number;
  specialty: string;
  qualification: string;
  experienceYears: number;
  contactNumber: string;
  email: string;
  languages: string;
  availableTimeInterval: number;
  chargesPerTimeInterval: number;
  oauthId: string;
  profileStatus: boolean;
  address: string;
  baseImgUrl: string;
  iconImgUrl: string;
  departments: {
    id: number;
    departmentName: string;
  }[];
}

interface DoctorsResponse {
  status: number;
  message: string;
  data: Doctor[];
}

interface Treatment {
  id: number;
  departmentId: number;
  treatmentName: string;
  treatmentDescription: string;
}

interface Department {
  id: number;
  departmentName: string;
  description: string;
  serviceId: number;
  baseImgUrl: string;
  iconImgUrl: string;
  overview: string;
  treatments: Treatment[];
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

interface DepartmentsResponse {
  status: number;
  message: string;
  data: Department[];
}

// Individual Doctor appointment slots for individual date
interface AppointmentTimeSlot {
  startTime: string;
  endTime: string;
  appointmentStatus: 'AVAILABLE' | 'NOTAVAILABLE';
}
interface AppointmentSlots {
  appointmentDate: string;
  doctorId: number;
  appointmentTimeSlots: AppointmentTimeSlot[];
}
interface AppointmentSlotsResponse {
  status: number;
  message: string;
  data: AppointmentSlots[];
}
