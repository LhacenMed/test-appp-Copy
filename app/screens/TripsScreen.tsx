import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Trip {
  id: string;
  carType: string;
  companyId: string;
  createdAt: string;
  dateTime: string;
  departureCity: string;
  destinationCity: string;
  price: number;
  route: string;
  seatsAvailable: number;
  seatsBooked: number;
  status: string;
}

const TripsScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      console.log("Fetching trips...");
      console.log("Firestore instance type:", typeof FIREBASE_DB);
      console.log("Firestore instance:", FIREBASE_DB);

      if (!FIREBASE_DB) {
        throw new Error("Firestore instance is not properly initialized");
      }

      const tripsCollectionRef = collection(FIREBASE_DB, "trips");
      console.log("Collection reference created:", tripsCollectionRef);

      const tripsSnapshot = await getDocs(tripsCollectionRef);
      console.log("Snapshot received:", tripsSnapshot.size, "documents");
      console.log("First document data:", tripsSnapshot.docs[0]?.data());

      const tripsList = tripsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Trip[];

      console.log("Trips processed:", tripsList);
      setTrips(tripsList);
      setError(null);
    } catch (error) {
      console.error("Error details:", error);
      console.error(
        "Error stack:",
        error instanceof Error ? error.stack : "No stack trace"
      );
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      Alert.alert(
        "Error",
        "Failed to fetch trips: " +
          errorMessage +
          "\n\nPlease check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + " MRU";
  };

  const renderTripItem = ({ item }: { item: Trip }) => (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <Text style={styles.tripRoute}>{item.route}</Text>
        <Text style={styles.tripPrice}>{formatPrice(item.price)}</Text>
      </View>
      <View style={styles.tripDetails}>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Departure: </Text>
          {item.departureCity}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Destination: </Text>
          {item.destinationCity}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Date: </Text>
          {new Date(item.dateTime).toLocaleDateString()}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Time: </Text>
          {new Date(item.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Car Type: </Text>
          {item.carType}
        </Text>
      </View>
      <View style={styles.seatsInfo}>
        <Text style={styles.seatsText}>
          Available Seats: {item.seatsAvailable - item.seatsBooked}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: item.status === "Active" ? "#4CAF50" : "#FFA000",
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.headerTitle}>Available Trips</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : trips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No trips found</Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
  },
  tripItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tripRoute: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  tripPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2196F3",
  },
  tripDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: "600",
    color: "#333",
  },
  seatsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  seatsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 16,
  },
});

export default TripsScreen;
