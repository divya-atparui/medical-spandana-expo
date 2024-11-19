/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router, Stack } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { mockDepartments } from '@/mocks/departments';
import {mockDoctors } from '@/mocks/doctors';
import { Button, Modal, Text, useModal } from '@/ui';
import { Input } from '@/ui';

const DoctorCard = ({ item }: { item: Doctor }) => (
  <TouchableOpacity
    onPress={() => router.push(`/doctors/${item.id}`)}
    className="mb-4 flex-row items-center rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
  >
    <View className="mr-4 size-16 items-center justify-center overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
      <Ionicons
        name="person"
        size={32}
        color="#60A5FA"
        className="dark:text-blue-400"
      />
    </View>
    <View className="flex-1">
      <Text
        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
        numberOfLines={1}
      >
        Dr. {item.firstName} {item.lastName}
      </Text>
      <Text
        className="text-sm text-gray-600 dark:text-gray-400"
        numberOfLines={1}
      >
        {item.specialty}
      </Text>
      <View className="mt-1 flex-row items-center">
        <Ionicons name="star" size={14} color="#FFC107" />
        <Text className="ml-1 text-xs text-gray-600 dark:text-gray-400">
          {item.experienceYears} years exp.
        </Text>
        <Text className="ml-2 text-xs text-gray-600 dark:text-gray-400">
          ₹{item.chargesPerTimeInterval}/{item.availableTimeInterval} min
        </Text>
      </View>
    </View>
    <Ionicons
      name="chevron-forward"
      size={24}
      color="#9CA3AF"
      className="dark:text-gray-500"
    />
  </TouchableOpacity>
);

const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <View className="flex-1 items-center justify-center p-4">
    <Ionicons
      name="medical"
      size={64}
      color="#60A5FA"
      className="dark:text-blue-400"
    />
    <Text className="mt-4 text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
      {searchQuery ? 'No doctors found' : 'No doctors available'}
    </Text>
    <Text className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
      {searchQuery
        ? `We couldn't find any doctors matching "${searchQuery}"`
        : 'There are currently no doctors listed'}
    </Text>
  </View>
);

const FilterChip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`mr-2 rounded-full px-4 py-2 ${
      active ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-800'
    }`}
  >
    <Text
      className={`text-sm ${
        active ? 'text-primary-foreground' : 'text-gray-600 dark:text-gray-400'
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const DepartmentSelector = ({
  departments,
  selectedDepartments,
  onToggle,
  searchQuery,
  onSearchChange,
}: {
  departments: { id: number; departmentName: string }[];
  selectedDepartments: number[];
  onToggle: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) => (
  <View className="flex-1">
    <Input
      placeholder="Search departments"
      value={searchQuery}
      onChangeText={onSearchChange}
      className="mb-4"
    />
    <ScrollView className="flex-1">
      {departments
        .filter((dept) =>
          dept.departmentName.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((dept) => (
          <TouchableOpacity
            key={dept.id}
            onPress={() => onToggle(dept.id)}
            className="mb-2 flex-row items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800"
          >
            <Text className="text-gray-900 dark:text-gray-100">
              {dept.departmentName}
            </Text>
            {selectedDepartments.includes(dept.id) && (
              <Ionicons name="checkmark-circle" size={24} color="#60A5FA" />
            )}
          </TouchableOpacity>
        ))}
    </ScrollView>
  </View>
);

const experienceRanges = [
  { label: '0-2 years', min: 0, max: 2 },
  { label: '2-5 years', min: 2, max: 5 },
  { label: '5-10 years', min: 5, max: 10 },
  { label: '10+ years', min: 10, max: 100 },
];

const chargesRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500-₹1000', min: 500, max: 1000 },
  { label: '₹1000-₹2000', min: 1000, max: 2000 },
  { label: '₹2000+', min: 2000, max: 10000 },
];

export default function DoctorsScreen() {
  const [search, setSearch] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [selectedExperienceRange, setSelectedExperienceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [selectedChargesRange, setSelectedChargesRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const departmentModal = useModal();

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const toggleDepartment = useCallback((departmentId: number) => {
    setSelectedDepartments((prev) =>
      prev.includes(departmentId)
        ? prev.filter((id) => id !== departmentId)
        : [...prev, departmentId],
    );
  }, []);

  const filteredDoctors = useMemo(() => {
    const lowercasedQuery = search.toLowerCase();
    return mockDoctors.data.filter(
      (doctor) =>
        (doctor.firstName.toLowerCase().includes(lowercasedQuery) ||
          doctor.lastName.toLowerCase().includes(lowercasedQuery) ||
          doctor.specialty.toLowerCase().includes(lowercasedQuery)) &&
        (selectedDepartments.length === 0 ||
          doctor.departments.some((dept) =>
            selectedDepartments.includes(dept.id),
          )) &&
        (!selectedExperienceRange ||
          (doctor.experienceYears >= selectedExperienceRange.min &&
            doctor.experienceYears <= selectedExperienceRange.max)) &&
        (!selectedChargesRange ||
          (doctor.chargesPerTimeInterval >= selectedChargesRange.min &&
            doctor.chargesPerTimeInterval <= selectedChargesRange.max)),
    );
  }, [
    search,
    selectedDepartments,
    selectedExperienceRange,
    selectedChargesRange,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-gray-50 dark:bg-gray-900">
        <Stack.Screen
          options={{
            title: 'Doctors',
            headerSearchBarOptions: {
              placeholder: 'Search doctors',
              onChangeText: (event) => handleSearch(event.nativeEvent.text),
              autoFocus: false,
              hideWhenScrolling: false,
            },
          }}
        />

        {showFilters && (
          <View className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <View className="mb-4">
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Departments
                </Text>
                <TouchableOpacity onPress={departmentModal.present}>
                  <Text className="text-primary text-sm">
                    Select ({selectedDepartments.length})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text className="mb-2 text-base font-medium text-gray-900 dark:text-gray-100">
              Experience
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {experienceRanges.map((range) => (
                <FilterChip
                  key={range.label}
                  label={range.label}
                  active={selectedExperienceRange?.min === range.min}
                  onPress={() =>
                    setSelectedExperienceRange(
                      selectedExperienceRange?.min === range.min ? null : range,
                    )
                  }
                />
              ))}
            </ScrollView>

            <Text className="mb-2 text-base font-medium text-gray-900 dark:text-gray-100">
              Charges
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              {chargesRanges.map((range) => (
                <FilterChip
                  key={range.label}
                  label={range.label}
                  active={selectedChargesRange?.min === range.min}
                  onPress={() =>
                    setSelectedChargesRange(
                      selectedChargesRange?.min === range.min ? null : range,
                    )
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}

        <FlashList
          data={filteredDoctors}
          renderItem={({ item }) => <DoctorCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={88}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          ListEmptyComponent={<EmptyState searchQuery={search} />}
        />

        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          className="absolute bottom-6 right-6 size-14 items-center justify-center rounded-full bg-blue-500 shadow-lg"
          style={{ elevation: 5 }}
        >
          <Ionicons name="options" size={24} color="#FFFFFF" />
        </TouchableOpacity>

{/* departments selector on click will open the model */}
        <Modal
          ref={departmentModal.ref}
          title="Select Departments"
          snapPoints={['80%']}
        >
          <View className="flex-1 p-4">
            <DepartmentSelector
              departments={mockDepartments.data}
              selectedDepartments={selectedDepartments}
              onToggle={toggleDepartment}
              searchQuery={departmentSearch}
              onSearchChange={setDepartmentSearch}
            />
            <Button onPress={departmentModal.dismiss} className="mt-4">
              <Text>Done</Text>
            </Button>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}