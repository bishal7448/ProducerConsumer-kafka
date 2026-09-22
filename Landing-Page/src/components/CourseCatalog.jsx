import React from 'react';
import CourseCard from './CourseCard';

const COURSES = [
  {
    id: 'fullstack-web',
    title: 'Full-Stack Web Development',
    category: 'Web Engineering',
    level: 'Intermediate',
    rating: 4.9,
    price: 99,
    image: '/course_fullstack.jpg',
    description: 'Master modern frontend & backend architectures using React, Node.js, REST APIs, and production deployment workflows.',
    topics: ['React 19', 'Vite', 'REST APIs', 'UI/UX Design']
  },
  {
    id: 'java-kafka-stream',
    title: 'Java Spring Boot & Kafka Event Architecture',
    category: 'Backend & Distributed Systems',
    level: 'Advanced',
    rating: 4.95,
    price: 149,
    image: '/course_java_kafka.jpg',
    description: 'Build enterprise-grade event producers, consumer groups, microservices, and asynchronous event pipelines.',
    topics: ['Java 21', 'Spring Boot', 'Kafka Producer', 'Event Sourcing']
  },
  {
    id: 'uiux-masterclass',
    title: 'UI/UX Design & Frontend Systems Masterclass',
    category: 'Design & UX',
    level: 'All Levels',
    rating: 4.88,
    price: 79,
    image: '/course_uiux_design.jpg',
    description: 'Learn modern visual design systems, micro-interactions, responsive layouts, and user accessibility standards.',
    topics: ['CSS Architecture', 'Figma Wireframes', 'Animations', 'Design Systems']
  }
];

function CourseCatalog({ onBuyCourseClick }) {
  return (
    <section id="courses" className="catalog-section">
      <div className="section-header">
        <span className="section-subtitle">Featured Learning Paths</span>
        <h2 className="section-title">Explore Featured Courses</h2>
        <p className="section-description">
          Clicking "Buy a course" on any card below emits an event (<code>userClick</code>) directly to the Java Backend endpoint.
        </p>
      </div>

      <div className="courses-grid">
        {COURSES.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onBuyCourseClick={onBuyCourseClick} 
          />
        ))}
      </div>
    </section>
  );
}

export default CourseCatalog;
