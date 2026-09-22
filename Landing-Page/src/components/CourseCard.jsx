import React from 'react';

function CourseCard({ course, onBuyCourseClick }) {
  return (
    <div className="course-card">
      <div className="course-image-wrapper">
        <img src={course.image} alt={course.title} className="course-image" />
        <span className="level-badge">{course.level}</span>
      </div>
      <div className="course-body">
        <div className="course-meta">
          <span className="category-tag">{course.category}</span>
          <span className="rating-tag">★ {course.rating}</span>
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-topics">
          {course.topics.map((topic, index) => (
            <span key={index} className="topic-pill">{topic}</span>
          ))}
        </div>

        <div className="course-footer">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{course.price}</span>
          </div>
          <button className="buy-course-btn" onClick={onBuyCourseClick}>
            Buy a course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
