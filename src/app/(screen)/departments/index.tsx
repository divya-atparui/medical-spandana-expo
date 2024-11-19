import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router,Stack } from 'expo-router';
import React, { useCallback,useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import {  mockDepartments } from '@/mocks/departments';
import { Text } from '@/ui';

const DepartmentCard = ({ item }: { item: Department }) => (
  <View className="flex-1 p-2">
    <TouchableOpacity
      onPress={() => router.push(`/departments/${item.id}`)}
      className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      <View className="h-[120px] w-full items-center justify-center bg-blue-50">
        <Ionicons 
          name="medical-outline" 
          size={32} 
          color="#60A5FA" 
        />
      </View>
      <View className="p-4">
        <Text className="mb-1 text-base font-semibold text-gray-900" numberOfLines={1}>
          {item.departmentName}
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <View className="flex-1 items-center justify-center p-4">
    <Ionicons name="medical-outline" size={64} color="#60A5FA" />
    <Text className="mt-4 text-center text-xl font-semibold text-gray-900">
      {searchQuery ? 'No departments found' : 'No departments available'}
    </Text>
    <Text className="mt-2 text-center text-base text-gray-600">
      {searchQuery
        ? `We couldn't find any departments matching "${searchQuery}"`
        : 'There are currently no departments listed'}
    </Text>
  </View>
);

export default function AllDepartments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState(mockDepartments.data);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    const lowercasedQuery = text.toLowerCase();
    const filtered = mockDepartments.data.filter(
      (department) =>
        department.departmentName.toLowerCase().includes(lowercasedQuery) ||
        department.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDepartments(filtered);
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{ 
          title: 'Departments',
          headerSearchBarOptions: {
            placeholder: 'Search departments',
            onChangeText: (event) => handleSearch(event.nativeEvent.text),
            autoFocus: false,
            hideWhenScrolling: false,
          }
        }} 
      />
      <FlashList
        data={filteredDepartments}
        renderItem={({ item }) => <DepartmentCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        estimatedItemSize={200}
        contentContainerStyle={{ padding: 6 }}
        ListEmptyComponent={<EmptyState searchQuery={searchQuery} />}
      />
    </View>
  );
}