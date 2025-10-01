const courses = [
  { id: "digital_strategy", name: "Digital Strategy" },
  { id: "ai_productivity", name: "AI for Productivity" },
];

const CourseSelector = ({
  selectedCourse,
  onSelectCourse,
}: {
  selectedCourse: string;
  onSelectCourse: (courseId: string) => void;
}) => {
  return (
    <select
      className="w-full p-2 border rounded-lg"
      value={selectedCourse}
      onChange={(e) => onSelectCourse(e.target.value)}
    >
      <option value="">Select a course</option>
      {courses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.name}
        </option>
      ))}
    </select>
  );
};

export default CourseSelector;

