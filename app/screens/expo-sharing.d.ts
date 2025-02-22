declare module "expo-sharing" {
  export function shareAsync(
    url: string,
    options?: {
      dialogTitle?: string;
      UTI?: string;
      mimeType?: string;
      // Add other options as needed
    }
  ): Promise<void>;
}
