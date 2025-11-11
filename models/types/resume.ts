interface Job {
    title: string;
    description: string;
    location: string;
    requiredSkills: string[];
}

interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    submitDate?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    tailored: {
        skills: {
            score: number //number of skills mentioned in job description that matches with resumes skills
            tips: string[]; //Suggestions to make to the skills section. Do not encourage fabrication
        },
        experience: {
            score: number //experience mentioned in job description that matches with resume experience
            tips: string[]; //Suggestions to make to the experience section. Do not encourage fabrication
        },

        projects: {
            tips: string[]; //Suggestions to make to the experience section. Do not encourage fabrication
        },

        education: {
            minRequirementMet: string; //whether the degree mentioned in resume meets the minimum degree requirement mentioned in job description
        },
        certification: {
            minRequirementMet: string; //whether the certs mentioned in resume meets the minimum certs requirement mentioned in job description
        }
    };
}

interface TailorFeedback {
    skills: {
        score: number //number of skills mentioned in job description that matches with resumes skills
        tips: string[]; //Suggestions to make to the skills section. Do not encourage fabrication
    },
    experience: {
        score: number //experience mentioned in job description that matches with resume experience
        tips: string[]; //Suggestions to make to the experience section. Do not encourage fabrication
    },

    projects: {
        tips: string[]; //Suggestions to make to the experience section. Do not encourage fabrication
    },

    education: {
        minRequirementMet: string; //whether the degree mentioned in resume meets the minimum degree requirement mentioned in job description
    },
    certification: {
        minRequirementMet: string; //whether the certs mentioned in resume meets the minimum certs requirement mentioned in job description
    },
}