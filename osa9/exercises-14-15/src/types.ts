interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface DescriptedCoursePart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends DescriptedCoursePart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends DescriptedCoursePart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends DescriptedCoursePart {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
