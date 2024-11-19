/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { mockDoctors } from '@/mocks/doctors';
import { Button, Text } from '@/ui';

export interface Doctor {
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

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View className="mb-6 flex-1">
    <Text className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
      {title}
    </Text>
    {children}
  </View>
);

const InfoText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text className="text-base text-gray-600 dark:text-gray-400">{children}</Text>
);

export default function DoctorDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = useMemo(
    () => mockDoctors.data.find((d) => d.id.toString() === id),
    [id],
  );

  if (!doctor) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Doctor not found</Text>
      </View>
    );
  }

  const handleBookAppointment = () => {
    router.push({
      pathname: '/doctors/appointments',
      params: { doctorId: doctor.id },
    });
  };

  return (
    <View className="bg-background flex-1">
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="pb-8">
          {/* Profile Header */}
          <View className="relative">
            <View className="h-48 w-full bg-blue-500 shadow-sm" />
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-4 top-12 rounded-full bg-primary-900 p-2"
              accessibilityLabel="Go back"
            >
              <Ionicons name="chevron-back" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center p-4">
            <View className="mr-4 size-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
              <Ionicons
                name="person"
                size={40}
                color="#60A5FA"
                className="dark:text-blue-400"
              />
            </View>
            <View>
              <Text className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Dr. {doctor.firstName} {doctor.lastName}
              </Text>
              <Text className="text-lg text-gray-600 dark:text-gray-400">
                {doctor.specialty}
              </Text>
            </View>
          </View>

          <View className="p-4">
            <Section title="About">
              <InfoText>{doctor.email}</InfoText>
              <InfoText>{doctor.contactNumber}</InfoText>
              <InfoText>{doctor.address}</InfoText>
            </Section>

            <View className="flex flex-row gap-3">
              <Section title="Qualification">
                <InfoText>{doctor.qualification}</InfoText>
              </Section>
              <Section title="Experience">
                <InfoText>
                  {doctor.experienceYears}
                  <Text>years</Text>
                </InfoText>
              </Section>
            </View>
            <View className="flex flex-row">
              <Section title="Languages">
                <InfoText>{doctor.languages}</InfoText>
              </Section>
              <Section title="Consultation Fee">
                <InfoText>
                  <Text>₹
                  {doctor.chargesPerTimeInterval}
                  /
                  {doctor.availableTimeInterval} min
                  </Text>
                </InfoText>
              </Section>
            </View>

            <Section title="Departments">
              <View className="flex-row flex-wrap gap-2">
                {doctor.departments.map((dept) => (
                  <View
                    key={dept.id}
                    className="bg-primary/10 rounded-full px-3 py-1"
                  >
                    <Text className="text-primary text-sm">
                      {dept.departmentName}
                    </Text>
                  </View>
                ))}
              </View>
            </Section>

            <Button onPress={handleBookAppointment} className="mt-4">
              <Text className="text-center font-semibold text-white">
                Book Appointment
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
