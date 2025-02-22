import React, { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../../context/ThemeContext";

interface BookingsIconProps {
  isFocused: boolean;
  width?: number;
  height?: number;
  props?: React.SVGProps<SVGSVGElement>;
}

const BookingsIcon: React.FC<BookingsIconProps> = ({
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
    <>
      {isFocused ? (
        // Bookmark Icon (filled)
        <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 11.0975V16.0909C21 19.1875 21 20.7358 20.2659 21.4123C19.9158 21.735 19.4739 21.9377 19.0031 21.9915C18.016 22.1045 16.8633 21.0849 14.5578 19.0458C13.5388 18.1445 13.0292 17.6938 12.4397 17.5751C12.1494 17.5166 11.8506 17.5166 11.5603 17.5751C10.9708 17.6938 10.4612 18.1445 9.44216 19.0458C7.13673 21.0849 5.98402 22.1045 4.99692 21.9915C4.52615 21.9377 4.08421 21.735 3.73411 21.4123C3 20.7358 3 19.1875 3 16.0909V11.0975C3 6.80891 3 4.6646 4.31802 3.3323C5.63604 2 7.75736 2 12 2C16.2426 2 18.364 2 19.682 3.3323C21 4.6646 21 6.80891 21 11.0975ZM8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6C15.75 6.41421 15.4142 6.75 15 6.75H9C8.58579 6.75 8.25 6.41421 8.25 6Z"
            fill={fillColor}
            strokeWidth="0"
          />
        </Svg>
      ) : (
        // Bookmark Icon (outline)
        <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
          <Path
            d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
            fill="rgba(0, 0, 0, 0)"
            stroke={strokeColor}
            strokeWidth="2"
          />
          <Path
            d="M15 6H9"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      )}
    </>
  );
};

export default BookingsIcon;
