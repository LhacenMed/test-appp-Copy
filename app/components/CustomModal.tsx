import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      onClose();
    }
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={["50%"]}
        onDismiss={onClose}
      >
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                This is a custom bottom sheet!
              </Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </PanGestureHandler>
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContent: {
    width: "100%",
    padding: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default CustomModal;
