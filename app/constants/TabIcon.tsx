import { Feather } from "@expo/vector-icons";

const icons = {
  Home: (props: any) => <Feather name="home" size={24} {...props} />,
  Bookings: (props: any) => <Feather name="calendar" size={24} {...props} />,
  Explore: (props: any) => <Feather name="compass" size={24} {...props} />,
  Settings: (props: any) => <Feather name="settings" size={24} {...props} />,
};

export default icons;
