import React, { useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LocationInputs from "../components/LocationInputs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import LocationSelectionModal from "../components/LocationSelectionModal";

export default function Page() {
  const insets = useSafeAreaInsets();
  const [activeInput, setActiveInput] = React.useState<
    "departure" | "destination"
  >("departure");
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<
    string | null
  >(null);
  const [selectedDestinationCity, setSelectedDestinationCity] = useState<
    string | null
  >(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  const onCitySelect = (city: string) => {
    if (activeInput === "departure") {
      setSelectedDepartureCity(city);
      console.log(`Selected departure city: ${city}`);
    } else if (activeInput === "destination") {
      setSelectedDestinationCity(city);
      console.log(`Selected destination city: ${city}`);
    } else {
      console.log("Invalid input");
      setSelectedDestinationCity(null);
      setSelectedDepartureCity(null);
    }
  };

  const handleModalOpen = () => {
    setLocationModalVisible(true);
  };

  const handleModalClose = () => {
    setLocationModalVisible(false);
  };

  const handleDeparturePress = () => {
    setActiveInput("departure");
    handleModalOpen();
  };

  const handleDestinationPress = () => {
    setActiveInput("destination");
    handleModalOpen();
  };

  const handleDatePress = () => {
    setDatePickerVisible(true);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || selectedStartDate;
    setDatePickerVisible(false);
    setSelectedStartDate(currentDate);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hey there</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Icons */}
      <View style={styles.navContainer}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <View style={styles.navIconBg}>
            <MaterialIcons name="flight" size={24} color="#fff" />
          </View>
          <Text style={styles.navText}>Flights</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconBg}>
            <MaterialIcons name="hotel" size={24} color="#fff" />
          </View>
          <Text style={styles.navText}>Stays</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconBg}>
            <MaterialIcons name="directions-car" size={24} color="#fff" />
          </View>
          <Text style={styles.navText}>Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconBg}>
            <MaterialIcons name="beach-access" size={24} color="#fff" />
          </View>
          <Text style={styles.navText}>Packages</Text>
        </TouchableOpacity>
      </View>

      {/* Trip Type Selection */}
      <View style={styles.tripTypeContainer}>
        <TouchableOpacity style={styles.tripTypeActive}>
          <Text style={styles.tripTypeActiveText}>Round-trip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tripType}>
          <Text style={styles.tripTypeText}>One-way</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tripType}>
          <Text style={styles.tripTypeText}>Multi-city</Text>
        </TouchableOpacity>
      </View>

      {/* Location Inputs */}
      <LocationInputs
        onDeparturePress={handleDeparturePress}
        selectedDepartureCity={selectedDepartureCity}
        onDestinationPress={handleDestinationPress}
        selectedDestinationCity={selectedDestinationCity}
      />

      {/* Date Selection */}
      {/* <TouchableOpacity style={styles.dateContainer} onPress={handleDatePress}>
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>
            {selectedStartDate.toLocaleString("en-US", {
              day: "numeric",
              month: "short",
            })}
          </Text>
          <Text style={styles.dayText}>
            {selectedStartDate.toLocaleString("en-US", { weekday: "short" })}
          </Text>
        </View>
        <MaterialIcons
          name="arrow-forward"
          size={20}
          color="#fff"
          style={styles.dateArrow}
        />
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>2 Apr</Text>
          <Text style={styles.dayText}>Wed</Text>
        </View>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedStartDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )} */}

      {/* Travel Details */}
      <View style={styles.detailsContainer}>
        <TouchableOpacity style={styles.detailChip}>
          <Text style={styles.detailText}>1 Traveler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailChip}>
          <Text style={styles.detailText}>Economy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailChip}>
          <Text style={styles.detailText}>0 carry-on, 0 checked</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailChip}>
          <Text style={styles.detailText}>Any s...</Text>
        </TouchableOpacity>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Location Selection Modal */}
      <LocationSelectionModal
        visible={isLocationModalVisible}
        onClose={handleModalClose}
        onCitySelect={onCitySelect}
        type={activeInput}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3A3A3C",
    justifyContent: "center",
    alignItems: "center",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  navItem: {
    alignItems: "center",
    gap: 8,
  },
  navIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
  },
  activeNavItem: {
    opacity: 1,
  },
  navText: {
    color: "#fff",
    fontSize: 14,
  },
  tripTypeContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 16,
  },
  tripType: {
    paddingVertical: 8,
  },
  tripTypeActive: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  tripTypeText: {
    color: "#8E8E93",
    fontSize: 16,
  },
  tripTypeActiveText: {
    color: "#fff",
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dateSection: {
    flex: 1,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  dayText: {
    color: "#8E8E93",
    fontSize: 14,
  },
  dateArrow: {
    marginHorizontal: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  detailChip: {
    backgroundColor: "#2C2C2E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  detailText: {
    color: "#fff",
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: "#FF5A1F",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
});
