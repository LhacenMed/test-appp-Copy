import React from "react";
import Svg, { Path } from "react-native-svg";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

interface HomeIconProps {
  isFocused: boolean;
  width?: number;
  height?: number;
}

const HomeIcon: React.FC<HomeIconProps> = ({
  isFocused,
  width = 24,
  height = 24,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const fillColor = theme === "dark" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
  const strokeColor =
    theme === "dark" ? "rgb(124, 124, 124)" : "rgb(124, 124, 124)";
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
      {isFocused ? (
        // Home Icon (filled)
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="0"
        />
      ) : (
        // Home Icon (outlined)
        <>
          <Path
            d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
            stroke={strokeColor}
            strokeWidth="2"
            fill="rgba(0, 0, 0, 0)"
          />
          <Path
            d="M15 18H9"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </Svg>
  );
};

export default HomeIcon;
