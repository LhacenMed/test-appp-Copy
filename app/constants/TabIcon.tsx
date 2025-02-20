import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeIcon from "@assets/icons/HomeIcon";
import ExploreIcon from "@assets/icons/ExploreIcon";
import BookingsIcon from "@assets/icons/BookingsIcon";
import SettingsIcon from "@assets/icons/SettingsIcon";

const icons = {
  Home: (props: any) => <HomeIcon {...props} />,
  Explore: (props: any) => <ExploreIcon {...props} />,
  Bookings: (props: any) => <BookingsIcon {...props} />,
  Settings: (props: any) => <SettingsIcon {...props} />,
};

export default icons;
