import { User, Mail, MapPin, Calendar, Edit3, Camera, Save, X } from 'lucide-react';
import { useState } from 'react';

const UserProfile = ({ currentUser, onUpdateUser, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    location: currentUser.location || '',
    bio: currentUser.bio || '',
    subjects: currentUser.subjects || [],
    hourlyRate: currentUser.hourlyRate || '',
    experience: currentUser.experience || '',
    education: currentUser.education || '',
    languages: currentUser.languages || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleSave = () => {
    const updatedUser = { ...currentUser, ...formData };
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '',
      location: currentUser.location || '',
      bio: currentUser.bio || '',
      subjects: currentUser.subjects || [],
      hourlyRate: currentUser.hourlyRate || '',
      experience: currentUser.experience || '',
      education: currentUser.education || '',
      languages: currentUser.languages || []
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="btn btn-secondary">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="mt-4">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input text-center text-xl font-bold"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
                )}
                
                <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full capitalize">
                  {currentUser.type}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input flex-1"
                  />
                ) : (
                  <span>{currentUser.email}</span>
                )}
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Your location"
                    className="input flex-1"
                  />
                ) : (
                  <span>{currentUser.location || 'Location not set'}</span>
                )}
              </div>
              
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-3" />
                <span>Joined {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                    className="input resize-none"
                  />
                ) : (
                  <p className="text-gray-600">{currentUser.bio || 'No bio added yet.'}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="input"
                  />
                ) : (
                  <p className="text-gray-600">{currentUser.phone || 'Phone not set'}</p>
                )}
              </div>

              {/* Tutor-specific fields */}
              {currentUser.type === 'tutor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.subjects.join(', ')}
                        onChange={(e) => handleArrayChange('subjects', e.target.value)}
                        placeholder="Math, Physics, Chemistry (comma separated)"
                        className="input"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {currentUser.subjects?.map(subject => (
                          <span key={subject} className="px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                            {subject}
                          </span>
                        )) || <span className="text-gray-600">No subjects added</span>}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="hourlyRate"
                          value={formData.hourlyRate}
                          onChange={handleInputChange}
                          placeholder="50"
                          className="input"
                        />
                      ) : (
                        <p className="text-gray-600">${currentUser.hourlyRate || 'Not set'}/hour</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="5"
                          className="input"
                        />
                      ) : (
                        <p className="text-gray-600">{currentUser.experience || 'Not set'} years</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="PhD Mathematics - MIT"
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-600">{currentUser.education || 'Education not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.languages.join(', ')}
                        onChange={(e) => handleArrayChange('languages', e.target.value)}
                        placeholder="English, Spanish, French (comma separated)"
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-600">{currentUser.languages?.join(', ') || 'Languages not set'}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;