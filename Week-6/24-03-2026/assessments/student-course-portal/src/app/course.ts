export interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  topics: string[];
  enrolled: number;
  rating: number;
  thumbnail: string;
}