
export type AnalysisResult = { 
    riskLevel: "low" | "high";
    feedback: string;
};
// Local fallback analyzer (rule-based)
export function analyzeLocal(answers: number[]): AnalysisResult {
    const risky = answers.filter(a => a > 1).length;
    if (risky >= 2) {
        return {
            riskLevel: "high",
            feedback: "It seems you're under a lot of stress. Consider reaching out to someone you trust or a professional"
        };
    }
    return {
        riskLevel: "low",
        feedback: "you're doing well keep checking in with yourself."
    };
}


export async function analyzeServer(answers: string[]): Promise<AnalysisResult> {
    const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ responses: answers })
    });

    if (!res.ok) throw new Error("Server analysis failed");
    return res.json();
}

