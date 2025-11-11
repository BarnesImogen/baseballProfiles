import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPlayerById, updatePlayer, addPlayer } from '../data/players';
import { Player } from '../types/Player';
import './ProfileEdit.css';

function ProfileEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [player, setPlayer] = useState<Player>({
    id: '',
    name: '',
    nickname: '',
    position: '',
    graduationYear: '',
    height: '',
    weight: '',
    batsThrows: '',
    gpa: '',
    email: '',
    phone: '',
    fieldLevel: '',
    twitter: '',
    gamesPlayed: '',
    stats: {
      catching: [],
      hitting: [],
      pitching: []
    },
    experience: [],
    bio: ''
  });

  useEffect(() => {
    if (!isNew && id) {
      const playerData = getPlayerById(id);
      if (playerData) {
        setPlayer(playerData);
      } else {
        navigate('/');
      }
    }
  }, [id, isNew, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlayer(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (category: 'catching' | 'hitting' | 'pitching', index: number, field: 'label' | 'value', value: string) => {
    setPlayer(prev => {
      const newStats = { ...prev.stats };
      if (newStats[category]) {
        newStats[category]![index] = {
          ...newStats[category]![index],
          [field]: value
        };
      }
      return { ...prev, stats: newStats };
    });
  };

  const addStat = (category: 'catching' | 'hitting' | 'pitching') => {
    setPlayer(prev => {
      const newStats = { ...prev.stats };
      if (!newStats[category]) {
        newStats[category] = [];
      }
      newStats[category]!.push({ label: '', value: '' });
      return { ...prev, stats: newStats };
    });
  };

  const removeStat = (category: 'catching' | 'hitting' | 'pitching', index: number) => {
    setPlayer(prev => {
      const newStats = { ...prev.stats };
      if (newStats[category]) {
        newStats[category] = newStats[category]!.filter((_, i) => i !== index);
      }
      return { ...prev, stats: newStats };
    });
  };

  const handleExperienceChange = (index: number, value: string) => {
    setPlayer(prev => {
      const newExperience = [...prev.experience];
      newExperience[index] = value;
      return { ...prev, experience: newExperience };
    });
  };

  const addExperience = () => {
    setPlayer(prev => ({
      ...prev,
      experience: [...prev.experience, '']
    }));
  };

  const removeExperience = (index: number) => {
    setPlayer(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isNew) {
      // Generate ID from name
      const newId = player.name.toLowerCase().replace(/\s+/g, '-');
      const newPlayer = { ...player, id: newId };
      addPlayer(newPlayer);
      navigate(`/profile/${newId}`);
    } else if (id) {
      updatePlayer(id, player);
      navigate(`/profile/${id}`);
    }
  };

  return (
    <div className="profile-edit">
      <div className="edit-header">
        <Link to={isNew ? '/' : `/profile/${id}`} className="back-link">
          ← Back
        </Link>
        <h1 className="edit-title">
          {isNew ? 'Create New Profile' : 'Edit Profile'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        {/* Basic Information */}
        <section className="form-section">
          <h2 className="section-heading">Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={player.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nickname">Nickname *</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={player.nickname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={player.position}
                onChange={handleChange}
                placeholder="e.g., Catcher / 2nd Base"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="graduationYear">Graduation Year *</label>
              <input
                type="text"
                id="graduationYear"
                name="graduationYear"
                value={player.graduationYear}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input
                type="text"
                id="height"
                name="height"
                value={player.height}
                onChange={handleChange}
                placeholder="e.g., 5'10&quot;"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={player.weight}
                onChange={handleChange}
                placeholder="e.g., 175 lbs"
              />
            </div>

            <div className="form-group">
              <label htmlFor="batsThrows">Bats/Throws</label>
              <input
                type="text"
                id="batsThrows"
                name="batsThrows"
                value={player.batsThrows}
                onChange={handleChange}
                placeholder="e.g., R/R"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gpa">GPA</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={player.gpa || ''}
                onChange={handleChange}
                placeholder="e.g., 3.82"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gamesPlayed">Games Played</label>
              <input
                type="text"
                id="gamesPlayed"
                name="gamesPlayed"
                value={player.gamesPlayed || ''}
                onChange={handleChange}
                placeholder="e.g., 7"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="form-section">
          <h2 className="section-heading">Contact Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={player.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={player.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fieldLevel">Field Level URL</label>
              <input
                type="url"
                id="fieldLevel"
                name="fieldLevel"
                value={player.fieldLevel || ''}
                onChange={handleChange}
                placeholder="https://www.fieldlevel.com/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter URL</label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={player.twitter || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="form-section">
          <h2 className="section-heading">Biography</h2>
          <div className="form-group full-width">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={player.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
        </section>

        {/* Statistics */}
        <section className="form-section">
          <h2 className="section-heading">Statistics</h2>
          
          {/* Catching Stats */}
          <div className="stats-subsection">
            <h3 className="subsection-title">Catching Stats</h3>
            {player.stats.catching?.map((stat, index) => (
              <div key={index} className="stat-row">
                <input
                  type="text"
                  placeholder="Label (e.g., Pop Time)"
                  value={stat.label}
                  onChange={(e) => handleStatChange('catching', index, 'label', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., 1.98s)"
                  value={stat.value}
                  onChange={(e) => handleStatChange('catching', index, 'value', e.target.value)}
                />
                <button type="button" onClick={() => removeStat('catching', index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addStat('catching')} className="add-btn">
              + Add Catching Stat
            </button>
          </div>

          {/* Hitting Stats */}
          <div className="stats-subsection">
            <h3 className="subsection-title">Hitting Stats</h3>
            {player.stats.hitting?.map((stat, index) => (
              <div key={index} className="stat-row">
                <input
                  type="text"
                  placeholder="Label (e.g., Batting Avg)"
                  value={stat.label}
                  onChange={(e) => handleStatChange('hitting', index, 'label', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., .421)"
                  value={stat.value}
                  onChange={(e) => handleStatChange('hitting', index, 'value', e.target.value)}
                />
                <button type="button" onClick={() => removeStat('hitting', index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addStat('hitting')} className="add-btn">
              + Add Hitting Stat
            </button>
          </div>

          {/* Pitching Stats */}
          <div className="stats-subsection">
            <h3 className="subsection-title">Pitching Stats</h3>
            {player.stats.pitching?.map((stat, index) => (
              <div key={index} className="stat-row">
                <input
                  type="text"
                  placeholder="Label (e.g., Fastball)"
                  value={stat.label}
                  onChange={(e) => handleStatChange('pitching', index, 'label', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value (e.g., 85-88 MPH)"
                  value={stat.value}
                  onChange={(e) => handleStatChange('pitching', index, 'value', e.target.value)}
                />
                <button type="button" onClick={() => removeStat('pitching', index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addStat('pitching')} className="add-btn">
              + Add Pitching Stat
            </button>
          </div>
        </section>

        {/* Experience */}
        <section className="form-section">
          <h2 className="section-heading">Experience</h2>
          {player.experience.map((exp, index) => (
            <div key={index} className="experience-row">
              <input
                type="text"
                placeholder="e.g., College Prospects Australia Showcase (2025)"
                value={exp}
                onChange={(e) => handleExperienceChange(index, e.target.value)}
              />
              <button type="button" onClick={() => removeExperience(index)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="add-btn">
            + Add Experience
          </button>
        </section>

        {/* Submit Buttons */}
        <div className="form-actions">
          <Link to={isNew ? '/' : `/profile/${id}`} className="cancel-btn">
            Cancel
          </Link>
          <button type="submit" className="save-btn">
            {isNew ? 'Create Profile' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
