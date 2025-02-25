import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  Animated,
  BackHandler,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

// Define prop types for ColorSchemePopup
interface ColorSchemePopupProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (scheme: string) => void;
}

// Define prop types for RadioButton
interface RadioButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onPress: () => void;
}

const ColorSchemePopup: React.FC<ColorSchemePopupProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const themes = useContext(ThemeContext);
  const [selectedScheme, setSelectedScheme] = useState(themes.mode);
  const [isDonePressed, setIsDonePressed] = useState(false);

  const backgroundColor = themes.theme === "dark" ? "#1E1E1E" : "#ffffff";
  const textColor = themes.theme === "dark" ? "#ffffff" : "#1E1E1E";
  const borderColor =
    themes.theme === "dark" ? "#404040" : "rgb(210, 210, 210)";
  const borderPressedColor =
    themes.theme === "dark"
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(80, 80, 80, 0.7)";
  const backgroundPressedColor =
    themes.theme === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(80, 80, 80, 0.1)";
  const modalBackgroundColor =
    themes.theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(67, 67, 67, 0.5)";

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        translateY.setValue(10);
      });
    }
  }, [visible]);

  useEffect(() => {
    const backAction = () => {
      closePopup();
      return true; // Prevent default behavior (exit app)
    };

    if (visible) {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    }

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [visible]);

  const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    value,
    isSelected,
    onPress,
  }) => {
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const innerScaleAnim = useRef(
      new Animated.Value(isSelected ? 1 : 0)
    ).current;

    useEffect(() => {
      Animated.spring(innerScaleAnim, {
        toValue: isSelected ? 1 : 0,
        useNativeDriver: true,
        damping: 15,
        mass: 1,
        stiffness: 120,
      }).start();
    }, [isSelected]);

    const handlePressIn = () => {
      setIsButtonPressed(true);
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        damping: 15,
        mass: 1,
        stiffness: 120,
      }).start();
    };

    const handlePressOut = () => {
      setIsButtonPressed(false);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        mass: 1,
        stiffness: 120,
      }).start();
    };

    return (
      <Pressable
        style={styles.radioContainer}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <View style={styles.radioWrapper}>
          <Animated.View
            style={[
              styles.radioOuter,
              { transform: [{ scale: scaleAnim }], borderColor: textColor },
              isButtonPressed &&
                styles.radioOuterPressed && {
                  borderColor: borderPressedColor,
                  backgroundColor: backgroundPressedColor,
                },
            ]}
          >
            <Animated.View
              style={[
                styles.radioInner,
                {
                  transform: [{ scale: innerScaleAnim }],
                  backgroundColor: textColor,
                },
              ]}
            />
          </Animated.View>
          <Text style={[styles.radioLabel, { color: textColor }]}>{label}</Text>
        </View>
      </Pressable>
    );
  };

  const handleDone = () => {
    // Start exit animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation completes, update theme and close popup
      onSelect(selectedScheme);
      onClose();
    });
  };

  const closePopup = () => {
    // Start exit animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation completes, reset to initial position
      translateY.setValue(10);
      onClose();
    });
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={closePopup}>
      <Animated.View
        style={[
          styles.popupOverlay,
          {
            backgroundColor: modalBackgroundColor,
            opacity: backdropOpacity,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={[
              styles.popupContent,
              {
                backgroundColor: backgroundColor,
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                { color: textColor, borderBottomColor: borderColor },
              ]}
            >
              Color Scheme
            </Text>
            <View style={styles.optionsContainer}>
              <RadioButton
                label="System"
                value="system"
                isSelected={selectedScheme === "system"}
                onPress={() => {
                  setSelectedScheme("system");
                }}
              />
              <RadioButton
                label="Light"
                value="light"
                isSelected={selectedScheme === "light"}
                onPress={() => {
                  setSelectedScheme("light");
                }}
              />
              <RadioButton
                label="Dark"
                value="dark"
                isSelected={selectedScheme === "dark"}
                onPress={() => {
                  setSelectedScheme("dark");
                }}
              />
            </View>
            <TouchableWithoutFeedback
              onPressIn={() => setIsDonePressed(true)}
              onPressOut={() => setIsDonePressed(false)}
              onPress={handleDone}
            >
              <View
                style={[
                  styles.doneButton,
                  { borderTopColor: borderColor },
                  isDonePressed && styles.doneButtonPressed,
                ]}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    width: 270,
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressed: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  optionsContainer: {
    paddingVertical: 10,
  },
  radioContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  radioWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterPressed: {
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  radioInner: {
    height: 9,
    width: 9,
    borderRadius: 6,
    backgroundColor: "white",
  },
  radioLabel: {
    color: "white",
    fontSize: 14,
    marginLeft: 15,
  },
  doneButton: {
    paddingVertical: 18,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#404040",
  },
  doneButtonPressed: {
    backgroundColor: "rgba(65, 105, 225, 0.1)",
  },
  doneButtonText: {
    color: "#4169E1",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ColorSchemePopup;
