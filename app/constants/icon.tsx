import { Feather } from "@expo/vector-icons";

const icons = {
    index: (props: any) => <Feather name="home" size={24} {...props} />,
    explore: (props: any) => <Feather name="compass" size={24} {...props} />,
    profile: (props: any) => <Feather name="user" size={24} {...props} />,
    settings: (props: any) => <Feather name="settings" size={24} {...props} />,
  };

export default icons;

// import { Feather } from "@expo/vector-icons";

// const icons = {
//   index: (color: string, size: number) => (
//     <Feather name="home" size={size} color={color} />
//   ),
//   explore: (color: string, size: number) => (
//     <Feather name="compass" size={size} color={color} />
//   ),
//   profile: (color: string, size: number) => (
//     <Feather name="user" size={size} color={color} />
//   ),
//   settings: (color: string, size: number) => (
//     <Feather name="settings" size={size} color={color} />
//   ),
// };

// export default icons;
