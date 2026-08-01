import { apiClient } from "./apiClient";

export interface LearningCourse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
  learningObjectives: string[];
  tags: string[];
  lessonIds: string[];
  prerequisiteCourseIds: string[];
  status: string;
  publishedAt?: string;
}

export interface LearningLesson {
  _id: string;
  courseId: string;
  title: string;
  slug: string;
  summary: string;
  sanitizedHtml: string;
  estimatedDuration: number;
  sequence: number;
  tags: string[];
  status: string;
  publishedAt?: string;
}

export interface LearningCourseDetail extends LearningCourse {
  lessons: LearningLesson[];
}

export interface LearningLessonDetail extends LearningLesson {
  course: Pick<
    LearningCourse,
    | "_id"
    | "title"
    | "slug"
    | "description"
    | "difficulty"
    | "estimatedDuration"
    | "learningObjectives"
  >;
}

export interface LessonProgress {
  _id: string;
  courseId: string;
  lessonId: string;
  progress: number;
  status: string;
  lastPosition?: number;
  startedAt?: string;
  completedAt?: string;
}

export type LearningRecommendation = Pick<
  LearningCourse,
  "_id" | "title" | "slug" | "description" | "difficulty" | "estimatedDuration" | "tags"
>;

export const learningService = {
  course: (slug: string) =>
    apiClient.get<LearningCourseDetail>(`/learning/courses/${slug}`, {
      retryAuthentication: false,
    }),
  courses: () =>
    apiClient.get<LearningCourse[]>("/learning/courses", {
      retryAuthentication: false,
    }),
  lesson: (slug: string) =>
    apiClient.get<LearningLessonDetail>(`/learning/lessons/${slug}`, {
      retryAuthentication: false,
    }),
  recommendationsForReport: (reportId: string) =>
    apiClient.get<LearningRecommendation[]>(
      `/learning/recommendations/report/${reportId}`,
    ),
  progress: (courseId: string) =>
    apiClient.get<LessonProgress[]>(`/learning/courses/${courseId}/progress`),
  updateProgress: (
    lessonId: string,
    input: { progress: number; lastPosition?: number },
  ) =>
    apiClient.patch<LessonProgress>(
      `/learning/lessons/${lessonId}/progress`,
      input,
    ),
};
