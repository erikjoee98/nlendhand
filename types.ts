
export enum Screen {
    HOME = 'HOME',
    EXPLORE = 'EXPLORE',
    IMPACT = 'IMPACT',
    TRUST = 'TRUST',
    DETAIL = 'DETAIL',
    DONATE = 'DONATE',
    SUCCESS_STORY_DETAIL = 'SUCCESS_STORY_DETAIL'
}

export interface Campaign {
    id: string;
    title: string;
    description: string;
    image: string;
    raised: number;
    goal: number;
    percentage: number;
    category: string;
    author?: string;
    authorImage?: string;
    verified?: boolean;
}

export interface SuccessStory {
    id: string;
    name: string;
    detail: string;
    img: string;
    fullStory: string;
    highlights: { label: string; before: string; after: string }[];
}

export interface Milestone {
    label: string;
    amount: string;
    description: string;
    status: 'achieved' | 'current' | 'target';
    progress?: number;
}