export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string; // або Date, якщо працюєш з датами
  authors: string[];
}
