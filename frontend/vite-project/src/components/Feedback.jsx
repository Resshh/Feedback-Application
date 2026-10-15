import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

const empty = { course_name: "", feedback_comment: "", feedback_rating: "" };

function AddFeedback() {
  const { id } = useParams(); // present when editing
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(empty);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${API}/course`).then((res) => setCourses(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!id) return setFeedback(empty);
    axios.get(`${API}/feedback/${id}`)
      .then((res) => setFeedback(res.data))
      .catch(() => alert("Could not load feedback"));
  }, [id]);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rating = Number(feedback.feedback_rating);
    if (rating < 0 || rating > 5) {
      alert("Rating must be between 0 and 5");
      return;
    }
    const body = {
      course_name: feedback.course_name,
      feedback_comment: feedback.feedback_comment,
      feedback_rating: rating,
    };

    try {
      if (id) {
        await axios.put(`${API}/feedback/${id}`, body);
        alert("Feedback Updated Successfully");
      } else {
        await axios.post(`${API}/feedback`, body);
        alert("Feedback Added Successfully");
      }
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Update Feedback" : "Add Feedback"}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Course Name
          <select name="course_name" value={feedback.course_name} onChange={handleChange} required>
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c._id} value={c.course_name}>{c.course_name}</option>
            ))}
          </select>
        </label>

        <label>
          Feedback Comments
          <textarea
            name="feedback_comment"
            placeholder="What did you think of the course?"
            value={feedback.feedback_comment}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>

        <label>
          Feedback Rating (0 - 5)
          <input
            type="number"
            name="feedback_rating"
            placeholder="e.g. 4.5"
            value={feedback.feedback_rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </label>

        <button type="submit" className="btn primary">{id ? "Update Feedback" : "Add Feedback"}</button>
      </form>
    </div>
  );
}

export default AddFeedback;
