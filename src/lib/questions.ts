export type Option = {
    text: string;
    score: number;
    emoji?: string;
    highRisk?: boolean;
};
export type Question = {
    id: string;
    prompt: string;
    options: Option[];
};

export const SBQ_QUESTIONS: Question[] = [
    {
        id: "q1",
        prompt: "If you feel suddenly overwhelmed, what do you do?",
        options: [
            { text: "Take a short walk / breathe / call someone", score: 0, emoji: "🚶" },
            { text: "Try to distract myself (music, game)", score: 1, emoji: "🎧" },
            { text: "Keep it to myself and push through", score: 2, emoji: "😶" },
            { text: "Think about hurting myself or giving up", score: 3, emoji: "⚠️", highRisk: true }
        ]
    },
    {
        id: "q2",
        prompt: "When something goes wrong, how do you normally respond?",
        options: [
            { text: "Try a solution and ask for help if needed", score: 0, emoji: "🛠️" },
            { text: "Put it off but stay okay", score: 1, emoji: "⏳" },
            { text: "Feel stuck and unable to continue", score: 2, emoji: "😕" },
            { text: "I feel it's hopeless / think of harming myself", score: 3, emoji: "⚠️", highRisk: true }
        ]
    },
    {
        id: "q3",
        prompt: "How often have you felt lonely or unsupported recently?",
        options: [
            { text: "Rarely or not at all", score: 0, emoji: "😊" },
            { text: "Sometimes", score: 1, emoji: "🙂" },
            { text: "Often", score: 2, emoji: "😔" },
            { text: "Constantly and hopeless", score: 3, emoji: "⚠️", highRisk: true }
        ]
    },
    {
        id: "q4",
        prompt: "If you notice negative thoughts, what do you usually do?",
        options: [
            { text: "Use coping skills (breathing, journaling)", score: 0, emoji: "📝" },
            { text: "Try to ignore them", score: 1, emoji: "🙈" },
            { text: "Ruminate for a long time", score: 2, emoji: "🔁" },
            { text: "Think about harming myself", score: 3, emoji: "⚠️", highRisk: true }
        ]
    },
    {
        id: "q5",
        prompt: "How have you been sleeping lately?",
        options: [
            { text: "Well enough", score: 0, emoji: "😴" },
            { text: "A little restless", score: 1, emoji: "🌙" },
            { text: "Often disrupted", score: 2, emoji: "🛌" },
            { text: "Hardly sleeping and losing hope", score: 3, emoji: "⚠️", highRisk: true }
        ]
    }
];