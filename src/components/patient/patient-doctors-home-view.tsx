import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React from 'react';

import { mockDoctors } from '@/mocks/doctors';
import { TouchableOpacity, View } from '@/ui';
import { Text } from '@/ui';

const DoctorCard = ({ item }: { item: Doctor }) => (
  <TouchableOpacity
    onPress={() => router.push(`/doctors/${item.id}`)}
    className="ml-2 mr-4 w-48"
  >
    <View className="overflow-hidden rounded-xl border-2 bg-white dark:border-blue-700">
      {/* <Image
        source={{ uri: item.iconImgUrl }}
        className="h-48 w-full"
        resizeMode="cover"
      /> */}
      <View className="h-48 w-full items-center justify-center bg-blue-100">
        <Ionicons name="person" size={64} color="#60A5FA" />
      </View>
      <View className="p-3">
        <Text
          className="text-lg font-semibold dark:text-black"
          numberOfLines={1}
        >
          Dr. {item.firstName} {item.lastName}
        </Text>
        <Text className="text-sm dark:text-black" numberOfLines={1}>
          {item.specialty}
        </Text>
        <View className="mt-2 flex-row items-center dark:text-black">
          
          <Text className="text-xs dark:text-black ">
            {item.experienceYears} years exp.
          </Text>
          <View className="mx-2 size-1 rounded-full" />
          <Text className="text-xs dark:text-black ">
            ${item.chargesPerTimeInterval}/{item.availableTimeInterval} min
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const PatientDoctorsHomeView = () => {
  return (
    <View className="h-full">
      <FlashList
        data={mockDoctors.data}
        renderItem={({ item }) => <DoctorCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={192}
        contentContainerStyle={{ paddingRight: 16 }}
      />
    </View>
  );
};

export default PatientDoctorsHomeView;
