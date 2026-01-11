export type MockAiResponse = { score: number; summary: string; details?: any };

export function generateMockResumeAnalysis(resumeText: string): MockAiResponse {
  const score = Math.min(100, Math.max(20, Math.floor(resumeText.length % 100)));
  return { score, summary: `Mock analysis (deterministic): score ${score}`, details: { length: resumeText.length } };
}
