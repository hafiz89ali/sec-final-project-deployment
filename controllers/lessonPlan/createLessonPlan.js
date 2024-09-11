import database from "../../database/connection.js";

const query = `
INSERT INTO lesson_plans (date, time, class_name, subject_name, title, lesson_plan, created_by)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id, date, time, class_name, subject_name, title, lesson_plan, created_by, created_at;
`;

async function createLessonPlan(req, res) {
  const { date, time, className, subjectName, title, lessonPlan } = req.body;
  // request user by using middleware
  const createdBy = req.user.id;
  try {
    const result = await database.query(query, [
      date,
      time,
      className,
      subjectName,
      title,
      lessonPlan,
      createdBy,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default createLessonPlan;
