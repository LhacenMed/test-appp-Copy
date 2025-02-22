import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

// Define prop types for ColorSchemeModal
interface ColorSchemeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (scheme: string) => void;
}

// Define prop types for RadioButton
interface RadioButtonProps {
  label: string;
  value: string;
}

const ColorSchemeModal: React.FC<ColorSchemeModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [selectedScheme, setSelectedScheme] = useState("system");

  const RadioButton: React.FC<RadioButtonProps> = ({ label, value }) => (
    <Pressable
      style={styles.radioContainer}
      onPress={() => {
        setSelectedScheme(value);
        onSelect(value);
      }}
    >
      <View style={styles.radioWrapper}>
        <View style={styles.radioOuter}>
          {selectedScheme === value && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>{label}</Text>
      </View>
    </Pressable>
  );

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Color Scheme</Text>

          <View style={styles.optionsContainer}>
            <RadioButton label="System" value="system" />
            <RadioButton label="Light" value="light" />
            <RadioButton label="Dark" value="dark" />
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
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
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
  radioLabel: {
    color: "white",
    fontSize: 18,
    marginLeft: 15,
  },
  doneButton: {
    padding: 15,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#404040",
  },
  doneButtonText: {
    color: "#4169E1",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ColorSchemeModal;
