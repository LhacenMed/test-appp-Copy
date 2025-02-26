import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Pressable,
  ScrollView,
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
  toggleTabBar: () => void;
  isTabBarVisible: boolean;
};

export interface DepBottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const DepBottomSheet = forwardRef<DepBottomSheetMethods, Props>(
  ({ onCitySelect, onExpand, onClose, toggleTabBar, isTabBarVisible }, ref) => {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const SHEET_HEIGHT = 700;
    const OPEN = 0;
    const CLOSE = SHEET_HEIGHT;
    const translateY = useSharedValue(CLOSE);
    const { theme } = useContext(ThemeContext);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const expand = useCallback(() => {
      translateY.value = withSpring(OPEN, {
        damping: 100,
        stiffness: 400,
      });
      onExpand();
    }, [translateY, onExpand]);

    const close = useCallback(() => {
      translateY.value = withSpring(CLOSE, {
        damping: 100,
        stiffness: 400,
      });
      onClose();
      if (!isTabBarVisible) {
        toggleTabBar();
      }
    }, [CLOSE, translateY, onClose, toggleTabBar, isTabBarVisible]);

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
                height: SHEET_HEIGHT,
                bottom: 0,
              },
              animationStyle,
              backgroundColorAnimation,
            ]}
          >
            <View style={[styles.line, lineColorAnimation]} />
            <View style={styles.content}>
              <SearchBar
                placeholder="Search departure locations..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <View style={styles.scrollContainer}>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  {filteredLocations.map((location) => (
                    <Pressable
                      key={location.id}
                      style={styles.locationItem}
                      onPress={() => {
                        onCitySelect(location.city);
                        close();
                      }}
                    >
                      <Text style={[styles.locationText, textColorAnimation]}>
                        {location.city}, {location.region}, {location.country}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default DepBottomSheet;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  line: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 8,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  locationList: {
    paddingBottom: 20,
  },
  locationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
