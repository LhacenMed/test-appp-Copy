import React from "react";
import { LanguageProvider } from "../context/LanguageContext";
import YourMainComponent from "./YourMainComponent"; // Replace with your main component

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <YourMainComponent />
    </LanguageProvider>
  );
};

export default App;
