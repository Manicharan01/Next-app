import { selector } from "recoil";
import { courseState, Course } from "../atoms/course";

export const getCourses = selector<Course[]>({
  key: "getCourses",
  get: ({ get }) => {
    const course = get(courseState);
    return course;
  },
});
