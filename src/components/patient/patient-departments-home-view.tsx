import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React from 'react';
import {TouchableOpacity } from 'react-native';

// Mock data based on the provided JSON structure
import { mockDepartments } from '@/mocks/departments';
import { Text, View } from '@/ui';


type Department = {
  id: number;
  departmentName: string;
  description: string;
  iconImgUrl: string;
};

const DepartmentCard = ({ item }: { item: Department }) => (
  <TouchableOpacity
    className="mr-4 w-72 pl-2"
    activeOpacity={0.7}
    onPress={() => router.push(`/departments/${item.id}`)}
  >
    <View className=" rounded-2xl border-2 border-blue-400 p-4">
      <View className="mb-3 size-20 items-center justify-center overflow-hidden rounded-full">
        {/* <Image
          source={{ uri: item.iconImgUrl }}
          className="size-full"
          resizeMode="cover"
        /> */}
          <View className="size-full bg-blue-500 shadow-sm" />
      </View>
      <Text className="mb-1 text-lg font-semibold" numberOfLines={1}>
        {item.departmentName}
      </Text>
      <Text className="text-md font-light text-neutral-700" numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  </TouchableOpacity>
);

const PatientDepartmentsHomeView = () => {
  return (
    <View className="h-full">
      <FlashList
        data={mockDepartments.data}
        renderItem={({ item }) => <DepartmentCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        estimatedItemSize={300}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PatientDepartmentsHomeView;