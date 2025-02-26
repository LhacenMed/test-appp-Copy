import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Pressable,
} from "react-native";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BackDrop from "./BackDrop";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../../context/ThemeContext";
import locations from "../constants/locationsData";
import SearchBar from "./SearchBar";

type Props = {
  onCitySelect: (city: string) => void;
  onExpand: () => void;
  onClose: () => void;
};

export interface DesBottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const DesBottomSheet = forwardRef<DesBottomSheetMethods, Props>(
  ({ onCitySelect, onExpand, onClose }, ref) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [DesBottomSheetHeight, setDesBottomSheetHeight] = useState(1000);
    const OPEN = 0;
    const CLOSE = DesBottomSheetHeight + insets.bottom;
    const translateY = useSharedValue(CLOSE);
    const { theme } = useContext(ThemeContext);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const expand = useCallback(() => {
      translateY.value = withTiming(OPEN);
      onExpand();
    }, [translateY, onExpand]);

    const close = useCallback(() => {
      translateY.value = withTiming(CLOSE);
      onClose();
    }, [CLOSE, translateY, onClose]);

    useImperativeHandle(ref, () => ({ expand, close }), [expand, close]);

    const animationStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const backgroundColorAnimation = {
      backgroundColor: theme === "dark" ? "#121212" : "#fff",
    };

    const lineColorAnimation = {
      backgroundColor: theme === "dark" ? "white" : "black",
    };

    const textColorAnimation = {
      color: theme === "dark" ? "white" : "black",
    };

    const pan = Gesture.Pan()
      .onUpdate((event) => {
        if (event.translationY < 0) {
          translateY.value = withSpring(OPEN, {
            damping: 200,
            stiffness: 800,
          });
        } else {
          translateY.value = withSpring(event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (translateY.value > 50) {
          translateY.value = withSpring(CLOSE, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          translateY.value = withSpring(OPEN, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const filteredLocations = locations.filter((location) =>
      location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <>
        <BackDrop
          close={close}
          translateY={translateY}
          openHeight={OPEN}
          closeHeight={CLOSE}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              {
                width: width,
                bottom: insets.bottom,
              },
              animationStyle,
              backgroundColorAnimation,
            ]}
            onLayout={({ nativeEvent }) => {
              const { height } = nativeEvent.layout;
              if (height) {
                setDesBottomSheetHeight(height);
                translateY.value = withTiming(height + insets.bottom);
              }
            }}
          >
            <View style={[styles.line, lineColorAnimation]} />
            <SearchBar
              placeholder="Search destination locations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.locationList}>
              {filteredLocations.map((location) => (
                <Pressable
                  key={location.id}
                  style={styles.locationItem}
                  onPress={() => {
                    onCitySelect(location.city);
                    close();
                  }}
                >
                  <Text style={textColorAnimation}>
                    {location.city}, {location.region}, {location.country}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default DesBottomSheet;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
    zIndex: 1,
  },
  line: {
    position: "absolute",
    top: 8,
    width: 40,
    height: 4,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 14,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  locationList: {
    marginTop: 20,
    padding: 10,
  },
  locationItem: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  searchBar: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
