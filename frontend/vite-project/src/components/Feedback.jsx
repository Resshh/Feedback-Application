import { useState } from "react";
import axios from "axios";

function AddFeedback() {
  const [feedback, setfeedback] = useState({
    course_name: "",
    feedback_comment: "",
    feedback_rating: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (product.rating < 0 || product.rating > 5) {
      alert("Rating must be between 0 and 5");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );

      console.log(response.data);

      alert("feedback Added Successfully");

      setProduct({
        title: "",
        image: "",
        price: "",
        rating: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Feedback</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          name="course_name"
          value={course.course_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="comments"
          name="image"
          value={feedback_comment}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          placeholder="Rating"
          name="rating"
          value={feedback_rating.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          required
        />

        <button type="submit">Add Feedback</button>
      </form>
    </div>
  );
}

export default AddFeedback;