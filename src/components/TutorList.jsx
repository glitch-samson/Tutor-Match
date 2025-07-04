import TutorCard from './TutorCard';

const TutorList = ({ tutors, onSelectTutor, onContactTutor }) => {
  if (tutors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
        <p className="text-gray-600">Try adjusting your search filters to find more tutors.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found
        </h2>
        <select className="input max-w-xs">
          <option value="rating">Sort by Rating</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="experience">Experience</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {tutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            tutor={tutor}
            onSelect={onSelectTutor}
            onContact={onContactTutor}
          />
        ))}
      </div>
    </div>
  );
};

export default TutorList;