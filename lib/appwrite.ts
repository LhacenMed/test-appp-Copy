import { Account, Client, ID } from "react-native-appwrite";

const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const config = {
  endpoint: requireEnvVar("APPWRITE_ENDPOINT"),
  platform: requireEnvVar("APPWRITE_PLATFORM"),
  projectId: requireEnvVar("APPWRITE_PROJECT_ID"),
  databaseId: requireEnvVar("APPWRITE_DATABASE_ID"),
  userCollectionId: requireEnvVar("APPWRITE_USER_COLLECTION_ID"),
  videoCollectionId: requireEnvVar("APPWRITE_VIDEO_COLLECTION_ID"),
  storageId: requireEnvVar("APPWRITE_STORAGE_ID"),
  apiKey: requireEnvVar("APPWRITE_API_KEY"),
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async (email: string, password: string, name: string) => {
  account.create(ID.unique(), email, password, name).then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};


