import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
  StatusBar,
} from "react-native";
import SearchBar from "./SearchBar";
import locations from "../constants/locationsData";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

type LocationSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onCitySelect: (city: string) => void;
  type: "departure" | "destination";
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.8;
const THRESHOLD = SCREEN_HEIGHT * 0.2;

const LocationSelectionModal: React.FC<LocationSelectionModalProps> = ({
  visible,
  onClose,
  onCitySelect,
  type,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const translateY = useSharedValue(0);

  const filteredLocations = locations.filter((location) =>
    location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onCitySelect(city);
    onClose();
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        // Only allow downward swipe
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > THRESHOLD) {
        translateY.value = withSpring(MODAL_HEIGHT, { damping: 50 });
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.5)"
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.modalContent, animatedStyle]}>
            <View style={styles.dragIndicator} />
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>
                Select {type === "departure" ? "Departure" : "Destination"}{" "}
                Location
              </Text>
            </View>

            <SearchBar
              placeholder={`Search ${type} locations...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView style={styles.locationList} bounces={false}>
              {filteredLocations.map((location) => (
                <Pressable
                  key={location.id}
                  style={styles.locationItem}
                  onPress={() => handleCitySelect(location.city)}
                >
                  <Text style={styles.locationText}>
                    {location.city}, {location.region}, {location.country}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#171717",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: MODAL_HEIGHT,
    padding: 20,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#3A3A3C",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  locationList: {
    marginTop: 20,
  },
  locationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});

export default LocationSelectionModal;
