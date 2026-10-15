import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/feedback`)
      .then((res) => setFeedbacks(res.data))
      .catch((error) => alert(error.response?.data?.message || "Could not load feedback"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this feedback?")) return;
    try {
      await axios.delete(`${API}/feedback/${id}`);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const avg = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.feedback_rating, 0) / feedbacks.length).toFixed(1)
    : "0.0";

  return (
    <div>
      <div className="page-head">
        <h1>Feedback Dashboard</h1>
        <div className="stats">
          <div className="stat"><span>{feedbacks.length}</span>Total Feedback</div>
          <div className="stat"><span>{avg} ★</span>Average Rating</div>
        </div>
      </div>

      {loading ? (
        <p className="empty">Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p className="empty">No feedback yet. Click "Add Feedback" to create one.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Overall Rating</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f._id}>
                  <td data-label="Course ID">{f.course_id}</td>
                  <td data-label="Course Name">{f.course_name}</td>
                  <td data-label="Duration">{f.course_duration} weeks</td>
                  <td data-label="Rating"><span className="badge">{f.feedback_rating} ★</span></td>
                  <td data-label="Comments">{f.feedback_comment}</td>
                  <td data-label="Actions" className="actions">
                    <button className="btn edit" onClick={() => navigate(`/edit/${f._id}`)}>Update</button>
                    <button className="btn delete" onClick={() => handleDelete(f._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
