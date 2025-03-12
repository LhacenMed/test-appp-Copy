import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LocationInputsProps = {
  onDeparturePress: () => void;
  selectedDepartureCity: string | null;
  onDestinationPress: () => void;
  selectedDestinationCity: string | null;
};

const LocationInputs = ({
  onDeparturePress,
  selectedDepartureCity,
  onDestinationPress,
  selectedDestinationCity,
}: LocationInputsProps) => {
  const animatedBgFrom = useRef(new Animated.Value(0)).current;
  const animatedBgTo = useRef(new Animated.Value(0)).current;
  const [departureCityName, setDepartureCityName] = useState<string | null>(
    selectedDepartureCity
  );
  const [destinationCityName, setDestinationCityName] = useState<string | null>(
    selectedDestinationCity
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [theme, setTheme] = useState<string | null | undefined>("light");
  const [themeSwitch, setThemeSwitch] = useState<string>("light");

  const [activeInput, setActiveInput] = useState<"departure" | "destination">(
    "departure"
  );

  const interpolatedBgFrom = animatedBgFrom.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1E1E1E", "#2A2A2A"],
  });

  const interpolatedBgTo = animatedBgTo.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1E1E1E", "#2A2A2A"],
  });

  const handlePressInFrom = () => {
    animatedBgFrom.setValue(1);
  };

  const handlePressOutFrom = () => {
    Animated.timing(animatedBgFrom, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressInTo = () => {
    animatedBgTo.setValue(1);
  };

  const handlePressOutTo = () => {
    Animated.timing(animatedBgTo, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const getUserApiAddress = async () => {
    const response = await fetch("https://ipinfo.io/json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
    };
  };

  const handleSwitchCities = () => {
    setDepartureCityName((prev) => {
      setDestinationCityName(prev);
      return destinationCityName;
    });
  };

  useEffect(() => {
    setDepartureCityName(selectedDepartureCity);
  }, [selectedDepartureCity]);

  useEffect(() => {
    setDestinationCityName(selectedDestinationCity);
  }, [selectedDestinationCity]);

  useEffect(() => {
    const fetchUserApiAddress = async () => {
      setLoading(true);
      try {
        const storedDepartureCityName =
          await AsyncStorage.getItem("departureCityName");
        const storedDestinationCityName = await AsyncStorage.getItem(
          "destinationCityName"
        );

        if (storedDepartureCityName && !selectedDepartureCity) {
          setDepartureCityName(storedDepartureCityName);
        }

        if (!storedDepartureCityName && !selectedDepartureCity) {
          const state = await NetInfo.fetch();
          if (!state.isConnected) {
            console.log("No internet connection");
            setLoading(false);
            return;
          }
          const userApiAddress = await getUserApiAddress();
          console.log("User API Address:", userApiAddress.ip);
          console.log(
            "User Location:",
            userApiAddress.city,
            userApiAddress.region,
            userApiAddress.country
          );
          setDepartureCityName(userApiAddress.city);
          await AsyncStorage.setItem("departureCityName", userApiAddress.city);
        }

        if (storedDestinationCityName) {
          setDestinationCityName(storedDestinationCityName);
        }
      } catch (error) {
        console.error("Error fetching city names from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserApiAddress();
  }, [selectedDepartureCity]);

  useEffect(() => {
    const storeCityNames = async () => {
      if (departureCityName) {
        await AsyncStorage.setItem("departureCityName", departureCityName);
      }
      if (destinationCityName) {
        await AsyncStorage.setItem("destinationCityName", destinationCityName);
      }
    };

    storeCityNames();
  }, [departureCityName, destinationCityName]);

  const handleDepartureInputPress = () => {
    onDeparturePress();
  };

  const handleDestinationInputPress = () => {
    onDestinationPress();
  };

  return (
    <View style={styles.locationContainer}>
      <Animated.View
        style={[
          styles.inputFieldContainer,
          { backgroundColor: interpolatedBgFrom },
        ]}
      >
        <Pressable
          onPressIn={handlePressInFrom}
          onPressOut={handlePressOutFrom}
          onPress={handleDepartureInputPress}
          style={styles.pressable}
        >
          <CustomText
            style={
              departureCityName ? styles.inputLabelWhite : styles.inputLabelGrey
            }
          >
            {departureCityName || "From?"}
            {loading && (
              <ActivityIndicator
                size="small"
                color="#666666"
                style={{
                  position: "absolute",
                  height: 10,
                  width: 10,
                  transform: [{ translateX: 10 }],
                }}
              />
            )}
          </CustomText>
        </Pressable>
      </Animated.View>
      <View style={styles.border} />
      <Animated.View
        style={[
          styles.inputFieldContainerSecond,
          { backgroundColor: interpolatedBgTo },
        ]}
      >
        <Pressable
          onPressIn={handlePressInTo}
          onPressOut={handlePressOutTo}
          onPress={handleDestinationInputPress}
          style={styles.pressable}
        >
          <CustomText
            style={
              destinationCityName
                ? styles.inputLabelWhite
                : styles.inputLabelGrey
            }
          >
            {destinationCityName || "To?"}
          </CustomText>
        </Pressable>
      </Animated.View>
      <Pressable
        style={({ pressed }) => [
          styles.swapButton,
          pressed && styles.swapButtonPressed,
        ]}
        onPress={handleSwitchCities}
      >
        <MaterialIcons name="swap-vert" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 18,
    marginBottom: 16,
    position: "relative",
  },
  inputFieldContainer: {
    borderColor: "#3A3A3C",
    borderBottomWidth: 2,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  inputFieldContainerSecond: {
    borderColor: "#3A3A3C",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
  },
  pressable: {
    padding: 15,
    paddingLeft: 20,
  },
  border: {
    height: 1,
    backgroundColor: "#3A3A3C",
    marginVertical: -1,
  },
  inputLabel: {
    color: "#666666",
    fontSize: 16,
  },
  inputLabelGrey: {
    color: "#666666",
    fontSize: 16,
  },
  inputLabelWhite: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  inputValue: {
    color: "#00FF00",
    fontSize: 16,
  },
  swapButton: {
    position: "absolute",
    right: 25,
    top: "50%",
    transform: [{ translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#3A3A3C",
    borderWidth: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    backgroundColor: "#2C2C2E",
  },
  swapButtonPressed: {
    backgroundColor: "#2C2C2E",
    borderColor: "#4A4A4C",
  },
});

export default LocationInputs;
