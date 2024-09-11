import database from "../../database/connection.js";

const getLessonPlanQuery = `
SELECT id, date, time, class_name, subject_name, title, lesson_plan, created_by, created_at
FROM lesson_plans
WHERE id = $1
`;

const updateLessonPlanQuery = `
UPDATE lesson_plans
SET date = $1, time = $2, class_name = $3, subject_name = $4, title = $5, lesson_plan = $6
WHERE id = $7
`;

async function updateLessonPlan(req, res) {
  try {
    // update field from body
    const { date, time, className, subjectName, title, lessonPlan } = req.body;

    // get lesson plan from database
    const getLessonPlanDb = await database.query(getLessonPlanQuery, [
      req.params.id,
    ]);
    const defaultLessonPlan = getLessonPlanDb.rows[0];

    if (!defaultLessonPlan) {
      return res.status(404).json({ error: "Lesson plan not found" });
    }

    // update lesson plan
    const updateLessonPlanDb = await database.query(updateLessonPlanQuery, [
      date || defaultLessonPlan.date,
      time || defaultLessonPlan.time,
      className || defaultLessonPlan.class_name,
      subjectName || defaultLessonPlan.subject_name,
      title || defaultLessonPlan.title,
      lessonPlan || defaultLessonPlan.lesson_plan,
      req.params.id,
    ]);

    if (updateLessonPlanDb.rowCount === 0) {
      return res.status(404).json({ error: "Lesson plan not found" });
    }

    const data = {
      message: "Lesson plan updated successfully",
    };
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default updateLessonPlan;
