// workout.js

function generateAIPlan(weight, goal, height) {
  const heightMeters = height / 39.37;
  const weightKg = weight / 2.205;
  const bmi = (weightKg / (heightMeters * heightMeters)).toFixed(1);

  const plan = `Based on your weight (${weight} lbs), height (${height} in), BMI: ${bmi}, and goal (${goal}), your weekly plan:\n\n- Mon: Full Body + Cardio\n- Wed: Upper Body + Core\n- Fri: Strength Training (Heavy)`;

  localStorage.setItem(`${localStorage.getItem('currentUser')}-schedule`, plan);

  document.getElementById("dynamic-content").querySelector('pre')?.remove();
  // Optionally, re-render dashboard schedule
  renderDashboard();
}

function generateWorkout() {
  const difficulty = document.getElementById("difficulty").value;
  const equipment = JSON.parse(localStorage.getItem(`${localStorage.getItem('currentUser')}-equipment`) || '[]');

  const workouts = {
    dumbbells: [
      "💪 Dumbbell Shoulder Press (3x10)",
      "💪 Dumbbell Rows (3x8)",
      "💪 Dumbbell Curls (3x12)"
    ],
    "lat pulldown": [
      "🔽 Lat Pulldown (3x10)",
      "🔽 Straight Arm Pulldown (3x12)",
      "🔽 Lat Cable Row (3x8)"
    ],
    "leg press": [
      "🦵 Leg Press (3x10)",
      "🦵 Calf Raise on Press (3x12)"
    ],
    "smith machine": [
      "🏋️ Smith Machine Squats (3x8)",
      "🏋️ Smith Machine Bench (3x10)",
      "🏋️ Smith Machine Lunges (3x8 each)"
    ],
    treadmill: [
      "🏃‍♂️ Treadmill Running - 20 mins",
      "🏃‍♀️ Interval Sprints - 15 mins"
    ],
    "bench press": [
      "🏋️ Bench Press (3x8)",
      "🏋️ Dumbbell Flyes (3x12)"
    ],
    "pull-up bar": [
      "💪 Pull-ups (3 sets to failure)",
      "💪 Hanging Leg Raises (3x15)"
    ],
    "cable machine": [
      "💪 Cable Tricep Pushdown (3x12)",
      "💪 Cable Bicep Curl (3x12)"
    ],
    barbell: [
      "🏋️ Barbell Deadlift (3x5)",
      "🏋️ Barbell Squats (3x8)"
    ],
    elliptical: [
      "🚴 Elliptical - 20 mins steady state"
    ],
    "stationary bike": [
      "🚴 Stationary Bike - 30 mins moderate pace"
    ],
    "leg curl machine": [
      "🦵 Leg Curls (3x12)"
    ]
  };

  let result = [];
  equipment.forEach(eq => {
    if (workouts[eq]) result = result.concat(workouts[eq]);
  });
  if (result.length === 0) result = ["⚠️ No equipment selected. Try adding some from setup page."];

  const workoutDiv = document.getElementById("workout");
  workoutDiv.innerHTML = result.map(e => `<div class="workout-box fade">${e}</div>`).join('');
  localStorage.setItem(`${localStorage.getItem('currentUser')}-workoutHTML`, workoutDiv.innerHTML);
}
