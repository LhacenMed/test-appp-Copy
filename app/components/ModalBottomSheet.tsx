import { View, StyleSheet, Text } from "react-native";
import React, { forwardRef, useMemo, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
export type Ref = BottomSheetModal;

const ModalBottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#1C1C1E" }}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      {...props}
    >
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetText}>Modal BottomSheet</Text>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
  bottomSheetText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ModalBottomSheet;
