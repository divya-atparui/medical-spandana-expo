import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { mockDepartments } from '@/mocks/departments';
import { ScrollView, Text, TouchableOpacity, View } from '@/ui';

const IndividualDepartmentsScreen = () => {
  const { id } = useLocalSearchParams();
  const department = mockDepartments.data.find((d) => d.id.toString() === id);

  if (!department) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Department not found</Text>
      </View>
    );
  }
  return (
    <View className="bg-background flex-1">
      <ScrollView>
        <View className="relative">
          {/* <Image
            source={{ uri: department.baseImgUrl }}
            className="h-48 w-full"
            resizeMode="cover"
          /> */}
          <View className="h-48 w-full bg-blue-500 shadow-sm" />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-4 top-12 rounded-full bg-primary-900 p-2"
          >
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View className="p-4">
          <Text className="text-2xl font-bold">
            {department.departmentName}
          </Text>
          <Text className="text-muted-foreground mt-2">
            {department.overview}
          </Text>

          <Text className="mt-6 text-xl font-semibold">
            Available Treatments
          </Text>
          {department.treatments.map((treatment) => (
            <View key={treatment.id} className="bg-card mt-4 rounded-lg p-4">
              <Text className="font-semibold">{treatment.treatmentName}</Text>
              <Text className="text-muted-foreground mt-1">
                {treatment.treatmentDescription}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualDepartmentsScreen;
