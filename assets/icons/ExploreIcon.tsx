import React, { useContext } from "react";
import Svg, { G, Path } from "react-native-svg";
import { ThemeContext } from "../../context/ThemeContext";

interface ExploreIconProps {
  isFocused: boolean;
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
  props?: React.SVGProps<SVGSVGElement>;
}

const ExploreIcon: React.FC<ExploreIconProps> = ({
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
        // Compass Icon (filled)
        <Svg width={22} height={22} viewBox="-8 0 512 512" {...props}>
          <Path
            d="M225.38 233.37c-12.5 12.5-12.5 32.76 0 45.25 12.49 12.5 32.76 12.5 45.25 0 12.5-12.5 12.5-32.76 0-45.25-12.5-12.49-32.76-12.49-45.25 0zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm126.14 148.05L308.17 300.4a31.938 31.938 0 0 1-15.77 15.77l-144.34 65.97c-16.65 7.61-33.81-9.55-26.2-26.2l65.98-144.35a31.938 31.938 0 0 1 15.77-15.77l144.34-65.97c16.65-7.6 33.8 9.55 26.19 26.2z"
            fill={fillColor}
          />
        </Svg>
      ) : (
        // Compass Icon (outline)
        <Svg width={width} height={height} viewBox="0 0 225.35599 225.35599">
          <G transform="translate(-38.701659,-15.600781)">
            <Path
              d="M 192.55579,76.307992 133.08645,103.4882 c -2.87619,1.31469 -5.18269,3.62119 -6.49738,6.49737 l -27.180195,59.46937 c -3.135341,6.85999 3.930525,13.92998 10.794645,10.79464 l 59.46934,-27.18022 c 2.87619,-1.31468 5.18269,-3.62118 6.49736,-6.49737 l 27.18022,-59.46935 c 3.13534,-6.86412 -3.93053,-13.929989 -10.79465,-10.794648 z m -31.87298,61.273958 c -5.13776,5.1377 -13.46856,5.1377 -18.60631,0 -5.13771,-5.13776 -5.13771,-13.46856 0,-18.60632 5.13775,-5.1377 13.46855,-5.1377 18.60631,0 5.13771,5.13776 5.13771,13.46856 0,18.60632 z M 151.37965,26.100588 c -56.432833,0 -102.17818,45.745348 -102.17818,102.178202 0,56.43284 45.745347,102.17819 102.17818,102.17819 56.43284,0 102.1782,-45.74535 102.1782,-102.17819 0,-56.432854 -45.74536,-102.178202 -102.1782,-102.178202 z m 0,188.103542 c -45.43635,0 -85.998611,-40.48899 -85.998611,-85.92534 0,-45.436368 40.562261,-85.744258 85.998611,-85.744258 45.43636,0 86.32362,40.30789 86.32362,85.744258 0,45.43635 -40.88726,85.92534 -86.32362,85.92534 z"
              fill={strokeColor}
              stroke="none"
              strokeWidth="0.412"
            />
          </G>
        </Svg>
      )}
    </>
  );
};

export default ExploreIcon;
