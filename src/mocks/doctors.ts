import { mockDepartments } from './departments';


export const mockDoctors: DoctorsResponse = {
  status: 0,
  message: "Success",
  data: [
    {
      id: 1,
      userId: 101,
      firstName: "John",
      lastName: "Doe",
      maxAppointmentsPerTimeSlot: 3,
      specialty: "Cardiologist",
      qualification: "MD, FACC",
      experienceYears: 15,
      contactNumber: "+1234567890",
      email: "john.doe@example.com",
      languages: "English, Spanish",
      availableTimeInterval: 30,
      chargesPerTimeInterval: 150,
      oauthId: "google-oauth2|12345678901234567890",
      profileStatus: true,
      address: "123 Medical Center Dr, Cityville, State 12345",
      baseImgUrl: "https://example.com/images/doctors/john-doe.jpg",
      iconImgUrl: "https://example.com/images/doctors/john-doe-icon.png",
      departments: [
        {
          id: mockDepartments.data[0].id,
          departmentName: mockDepartments.data[0].departmentName
        }
      ]
    },
    {
      id: 2,
      userId: 102,
      firstName: "Jane",
      lastName: "Smith",
      maxAppointmentsPerTimeSlot: 2,
      specialty: "Neurologist",
      qualification: "MD, PhD",
      experienceYears: 12,
      contactNumber: "+1987654321",
      email: "jane.smith@example.com",
      languages: "English, French",
      availableTimeInterval: 45,
      chargesPerTimeInterval: 200,
      oauthId: "google-oauth2|09876543210987654321",
      profileStatus: true,
      address: "456 Neuroscience Ave, Braintown, State 67890",
      baseImgUrl: "https://example.com/images/doctors/jane-smith.jpg",
      iconImgUrl: "https://example.com/images/doctors/jane-smith-icon.png",
      departments: [
        {
          id: mockDepartments.data[1].id,
          departmentName: mockDepartments.data[1].departmentName
        },
        {
          id: mockDepartments.data[0].id,
          departmentName: mockDepartments.data[0].departmentName
        }
      ]
    },
    {
      id: 3,
      userId: 103,
      firstName: "Michael",
      lastName: "Johnson",
      maxAppointmentsPerTimeSlot: 4,
      specialty: "Pediatrician",
      qualification: "MD, FAAP",
      experienceYears: 10,
      contactNumber: "+1122334455",
      email: "michael.johnson@example.com",
      languages: "English, German",
      availableTimeInterval: 20,
      chargesPerTimeInterval: 100,
      oauthId: "google-oauth2|11223344556677889900",
      profileStatus: true,
      address: "789 Kiddie Care Ln, Toddlerville, State 54321",
      baseImgUrl: "https://example.com/images/doctors/michael-johnson.jpg",
      iconImgUrl: "https://example.com/images/doctors/michael-johnson-icon.png",
      departments: [
        {
          id: mockDepartments.data[2].id,
          departmentName: mockDepartments.data[2].departmentName
        }
      ]
    },
    {
      id: 4,
      userId: 104,
      firstName: "Emily",
      lastName: "Brown",
      maxAppointmentsPerTimeSlot: 3,
      specialty: "Orthopedic Surgeon",
      qualification: "MD, FAAOS",
      experienceYears: 18,
      contactNumber: "+1555666777",
      email: "emily.brown@example.com",
      languages: "English, Mandarin",
      availableTimeInterval: 60,
      chargesPerTimeInterval: 250,
      oauthId: "google-oauth2|55566677788899900011",
      profileStatus: true,
      address: "101 Bone & Joint Blvd, Skeletonville, State 13579",
      baseImgUrl: "https://example.com/images/doctors/emily-brown.jpg",
      iconImgUrl: "https://example.com/images/doctors/emily-brown-icon.png",
      departments: [
        {
          id: mockDepartments.data[3].id,
          departmentName: mockDepartments.data[3].departmentName
        }
      ]
    }
  ]
};