async function generateAIWorkout(user) {
  const prompt = `
You are a fitness coach. Create a personalized 1-day gym workout.

User Info:
- Age: ${user.age}
- Weight: ${user.weight} lbs
- Height: ${user.height} inches
- Goal: ${user.goal}
- Equipment: ${user.equipment.join(', ')}

Include 5–7 beginner-friendly exercises. Use bullet points and keep it under 150 words.
`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 512
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No workout found.";
}

