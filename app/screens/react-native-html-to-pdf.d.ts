declare module "react-native-html-to-pdf" {
  export interface Options {
    html: string;
    fileName: string;
    directory?: string;
    base64?: boolean;
  }

  export function createPDF(options: Options): Promise<{ filePath: string }>;
}
