export interface readFileEventType {
  filePath: string;
}
export interface editFileEventType extends readFileEventType {
  content: string;
}

export interface deleteFileEventType extends readFileEventType {}

export interface createFileEventType extends readFileEventType {}
