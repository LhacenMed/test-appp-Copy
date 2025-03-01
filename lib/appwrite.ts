import { Account, Client, ID } from "react-native-appwrite";

const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.lhacenmed.Firebaseauthloginapp",
  projectId: "67af9cc40021fae1cb7b",
  databaseId: "67c32519003b8e5ffeba",
  userCollectionId: "67c32549002137578766",
  videoCollectionId: "67c325be00032fb7a8bb",
  storageId: "67c3288b001ccc480675",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};


