export const tutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    subjects: ["Mathematics", "Physics", "Calculus"],
    experience: 8,
    hourlyRate: 45,
    rating: 4.9,
    reviewCount: 127,
    location: "New York, NY",
    bio: "Experienced mathematics tutor with PhD in Applied Mathematics. Specializing in calculus, algebra, and physics for high school and college students.",
    availability: "Mon-Fri: 2PM-8PM",
    verified: true,
    languages: ["English", "Spanish"],
    education: "PhD Mathematics - MIT"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    subjects: ["Computer Science", "Programming", "Web Development"],
    experience: 6,
    hourlyRate: 60,
    rating: 4.8,
    reviewCount: 89,
    location: "San Francisco, CA",
    bio: "Full-stack developer and computer science tutor. Expert in JavaScript, Python, React, and database design.",
    availability: "Flexible schedule",
    verified: true,
    languages: ["English", "Mandarin"],
    education: "MS Computer Science - Stanford"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
    subjects: ["English", "Literature", "Writing"],
    experience: 10,
    hourlyRate: 40,
    rating: 4.95,
    reviewCount: 156,
    location: "Austin, TX",
    bio: "English literature professor with extensive experience in academic writing, essay composition, and literary analysis.",
    availability: "Weekends and evenings",
    verified: true,
    languages: ["English", "French"],
    education: "PhD English Literature - Harvard"
  },
  {
    id: 4,
    name: "David Thompson",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    subjects: ["Chemistry", "Biology", "Organic Chemistry"],
    experience: 12,
    hourlyRate: 55,
    rating: 4.7,
    reviewCount: 203,
    location: "Boston, MA",
    bio: "Research scientist and chemistry tutor with 12 years of teaching experience. Specialized in organic chemistry and biochemistry.",
    availability: "Mon-Wed-Fri: 4PM-9PM",
    verified: true,
    languages: ["English"],
    education: "PhD Chemistry - Yale"
  },
  {
    id: 5,
    name: "Lisa Park",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    subjects: ["SAT Prep", "ACT Prep", "Test Strategies"],
    experience: 7,
    hourlyRate: 50,
    rating: 4.85,
    reviewCount: 94,
    location: "Los Angeles, CA",
    bio: "Standardized test prep specialist with proven track record of improving student scores by 200+ points.",
    availability: "Saturdays and Sundays",
    verified: true,
    languages: ["English", "Korean"],
    education: "MA Education - UCLA"
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    subjects: ["History", "Social Studies", "Political Science"],
    experience: 9,
    hourlyRate: 35,
    rating: 4.6,
    reviewCount: 78,
    location: "Chicago, IL",
    bio: "History teacher and political science tutor with passion for making historical events engaging and memorable.",
    availability: "After school hours",
    verified: false,
    languages: ["English"],
    education: "MA History - University of Chicago"
  }
];

export const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Literature", 
  "Writing", "Computer Science", "Programming", "Web Development", "History", 
  "Social Studies", "Political Science", "SAT Prep", "ACT Prep", "Calculus", 
  "Algebra", "Geometry", "Statistics", "Economics", "Psychology", "Art", 
  "Music", "Languages", "Spanish", "French", "German", "Mandarin"
];

export const reviews = [
  {
    id: 1,
    tutorId: 1,
    studentName: "Alex M.",
    rating: 5,
    comment: "Sarah is an amazing tutor! She helped me understand calculus concepts that I'd been struggling with for months. Her teaching style is clear and patient.",
    date: "2024-01-15",
    subject: "Calculus"
  },
  {
    id: 2,
    tutorId: 1,
    studentName: "Jennifer K.",
    rating: 5,
    comment: "Excellent teacher with great explanations. My grades improved significantly after working with Sarah.",
    date: "2024-01-10",
    subject: "Mathematics"
  },
  {
    id: 3,
    tutorId: 2,
    studentName: "Robert L.",
    rating: 5,
    comment: "Michael helped me build my first web application. His knowledge of modern web technologies is outstanding.",
    date: "2024-01-12",
    subject: "Web Development"
  }
];