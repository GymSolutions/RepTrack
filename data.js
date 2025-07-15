// data.js
const EQUIPMENT = {
  cardio: ['Treadmill', 'Elliptical', 'Stationary Bike', 'Rowing Machine', 'Jump Rope'],
  chest: ['Smith Machine', 'Bench Press', 'Cable Machine', 'Chest Press Machine'],
  arms: ['Dumbbells', 'Barbell', 'Pull-up Bar', 'Cable Curls', 'Tricep Dips'],
  legs: ['Leg Press', 'Squat Rack', 'Leg Curl Machine', 'Calf Raise Machine'],
  core: ['Ab Wheel', 'Roman Chair', 'Cable Crunch', 'Medicine Ball']
};

const ACHIEVEMENTS = [
  { id: 'first_workout', title: 'First Workout', desc: 'Complete your first workout!', reward: 'Unlock Neon Theme' },
  { id: 'week_streak', title: 'One Week Streak', desc: 'Workout 7 days in a row!', reward: 'Unlock Cyberpunk Theme' },
  { id: 'photo_log', title: 'Photo Pro', desc: 'Upload 10 progress photos', reward: 'Unlock Avatar Pack' },
];

const THEMES = [
  { id: 'default', name: 'Default Dark', colors: { bg: '#0d0d0d', fg: '#f5f5f5', accent: '#ff2c2c' }},
  { id: 'neon', name: 'Neon Glow', colors: { bg: '#020024', fg: '#39ff14', accent: '#ff1493' }},
  { id: 'cyberpunk', name: 'Cyberpunk', colors: { bg: '#1f1b24', fg: '#ff00ff', accent: '#00ffff' }},
];

const WORKOUTS = {
  easy: ['Jumping Jacks', 'Bodyweight Squats', 'Push-ups', 'Plank (30s)'],
  medium: ['Dumbbell Curls (3x12)', 'Leg Press (3x10)', 'Bench Press (3x8)', 'Cable Rows (3x10)'],
  hard: ['Barbell Squats (5x5)', 'Deadlift (5x5)', 'Pull-ups (4x8)', 'Smith Machine Lunges (3x10 each)']
};
