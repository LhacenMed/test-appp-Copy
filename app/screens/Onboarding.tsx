import React, { useState, useRef } from "react";
import { View, Animated, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import OnboardingItem from "../components/OnboardingItem";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";
import slides from "../constants/slides";

import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type OnboardingRouteProp = RouteProp<
  { Onboarding: { onComplete: () => void } },
  "Onboarding"
>;

const Onboarding = ({ route }: { route?: OnboardingRouteProp }) => {
  const onComplete = route?.params?.onComplete;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<any>>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const index = viewableItems[0]?.index;
      if (index !== null && index !== undefined) {
        setCurrentIndex(index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      if (onComplete) onComplete();
      console.log("Navigating to LoginSignupScreen...");
      navigation.navigate("LoginSignupScreen");
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboarding;
