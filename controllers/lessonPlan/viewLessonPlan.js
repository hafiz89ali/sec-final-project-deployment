import database from "../../database/connection.js";

const query = `
SELECT id, date, time, class_name, subject_name, title, lesson_plan, created_by, created_at
FROM lesson_plans
WHERE id = $1
`;
async function viewLessonPlan(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const dbRes = await database.query(query, [id]);
    const lessonPlan = dbRes.rows[0];
    const data = {
      message: "Lesson Plan fetched successfully",
      data: lessonPlan,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default viewLessonPlan;
