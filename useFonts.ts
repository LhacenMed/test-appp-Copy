import * as Font from "expo-font";
import { useEffect, useState } from "react";

const useFonts = async () => {
  await Font.loadAsync({
    "Outfit-Regular": require("../assets/fonts/OutfitMedium.ttf"),
  });
};

export default useFonts;
