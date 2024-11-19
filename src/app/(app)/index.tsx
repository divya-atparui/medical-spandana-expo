/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, TouchableOpacity } from 'react-native';

import { useGetAllDoctors } from '@/api';
import PatientDepartmentsHomeView from '@/components/patient/patient-departments-home-view';
import PatientDoctorsHomeView from '@/components/patient/patient-doctors-home-view';
import { useDarkModeColor } from '@/core';
import { FocusAwareStatusBar, Text, View } from '@/ui';

export default function Home() {
  const { isDark } = useDarkModeColor();
  const { data } = useGetAllDoctors({
    variables: {
      tenantId: 'spandana',
    },
  });

  // Function to handle emergency call
  const handleEmergencyCall = async () => {
    const phoneNumber = '+911234567890'; // Mock Indian emergency number
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      console.error('Failed to make phone call:', error);
    }
  };
  console.log(data);

  const handleViewAllDepartments = () => {
    router.push('/departments');
  };

  const handleViewAllDoctors = () => {
    router.push('/doctors');
  };
  return (
    <ScrollView className="bg-background flex-1">
      <FocusAwareStatusBar />

      {/* Emergency Section */}
      <View className="bg-primary m-4 rounded-b-3xl p-4 shadow-sm">
        <Text className="mb-2 text-2xl font-bold text-indigo-500">
          Need urgent care?
        </Text>
        <TouchableOpacity
          onPress={handleEmergencyCall}
          className="bg-accent flex-row items-center justify-center rounded-full bg-blue-300 px-6 py-3 dark:bg-blue-800"
        >
          <Ionicons
            name="call"
            size={24}
            color={isDark ? '#E6F7FF' : '#1890FF'}
          />
          <Text className="ml-2 font-bold ">Call Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* Departments Section */}
      <View className="mt-6 ">
        <View className=" flex-row items-start justify-between px-3">
          <Text className="mb-4 text-3xl font-bold">Departments</Text>
          <TouchableOpacity onPress={handleViewAllDepartments}>
            <Text className="mt-2 text-lg font-semibold text-blue-500 ">
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PatientDepartmentsHomeView />
        </ScrollView>
      </View>

      {/* Doctors Section */}
      <View className="mt-6 ">
        <View className="flex-row items-start justify-between px-3">
          <Text className="mb-4 text-3xl font-bold">Top Doctors</Text>
          <TouchableOpacity onPress={handleViewAllDoctors}>
            <Text className="mt-2 text-lg font-semibold text-blue-500 ">
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <PatientDoctorsHomeView />
        </ScrollView>
      </View>

      {/* Featured Department */}
      <View className="mt-6 px-4">
        <Text className="mb-4 text-xl font-semibold">Featured: Cardiology</Text>
        <View className="bg-card rounded-lg p-4 shadow-sm">
          <Text className="mb-2 font-semibold">Heart Health Matters</Text>
          <Text className="text-muted-foreground mb-3">
            Learn about our advanced cardiac care and treatments.
          </Text>
          {/* <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          /> */}
          <TouchableOpacity className="bg-primary self-start rounded-full px-4 py-2">
            <Text className="text-primary-foreground font-semibold">
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom CTA */}
      <View className="mb-8 mt-6 px-4">
        <TouchableOpacity className="bg-accent flex-row items-center justify-center rounded-full px-6 py-3">
          <Ionicons name="calendar" size={24} color="white" />
          <Text className="ml-2 font-semibold text-white">
            Book an Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
