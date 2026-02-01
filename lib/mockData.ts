
import { Campaign, SuccessStory } from '../types';

export const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: '1',
        title: "Advanced Prosthetic Technology Fund",
        description: "This initiative supports access to next-generation prosthetic technology designed to restore mobility, independence, and quality of life.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0z287pxiHhm0ACu4-6I4iquQ0GlR3_n0nl8xUfbNxiIQt_SVgfssF0gl8sTVUuVaWvsk0kusT-cA3TK44mpBYf8tmKTudih16XSHidJlrPstSjih1dmwQkQ5I3OYTkAdHhiIDODkzep61SeLQrl_x9J8juEhiIfiv5Zu2R8vsjcOg2F396omO1NlEQyfIdF8vPJBClgisAle8Gf7G6mxoG-_zhkHqCgolw70wwiY0j7F_h-OephL3KzP9RRP4qpRFru6pWo1AYIQ",
        raised: 45280,
        goal: 60000,
        percentage: 75,
        category: 'Mobility',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '2',
        title: "Pediatric Mobility Equipment",
        description: "Focused on expanding access to specialized mobility equipment that enables children with physical challenges to move freely and confidently.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSAvXFeYtu79Gj3jVCuap6aWvxFPCIrtBAmGpMAGvyAFfZtphXESe7-RcXnK0L3Aty32kka-YRYki_l9885Lfr4rGlHv4UeYSZXTleb5bkcD9A1x2l22VsmqzLb7uRw47SnLQtIpD7Wr4ofROzCFOByUwNZIcsn6fD_v1DDBk4Bz5jdZRawYuMvO_YoOmsjrCPExP-o90wT0pX3sBTE_wDOvmsdQ8Qbzg1Hsb8mhKC55abaF95i1NmkkyTmzOUEx2IRErRBQ8xYF4",
        raised: 8200,
        goal: 10000,
        percentage: 82,
        category: 'Mobility',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '3',
        title: "Rehabilitation Access Program",
        description: "Supporting critical rehabilitation resources that help individuals recover faster and regain independence after serious injury.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0z287pxiHhm0ACu4-6I4iquQ0GlR3_n0nl8xUfbNxiIQt_SVgfssF0gl8sTVUuVaWvsk0kusT-cA3TK44mpBYf8tmKTudih16XSHidJlrPstSjih1dmwQkQ5I3OYTkAdHhiIDODkzep61SeLQrl_x9J8juEhiIfiv5Zu2R8vsjcOg2F396omO1NlEQyfIdF8vPJBClgisAle8Gf7G6mxoG-_zhkHqCgolw70wwiY0j7F_h-OephL3KzP9RRP4qpRFru6pWo1AYIQ",
        raised: 12500,
        goal: 45000,
        percentage: 27,
        category: 'Recovery',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '4',
        title: "Critical Care Equipment Fund",
        description: "Helping expand access to essential medical equipment that supports high-quality patient care in demanding environments.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCON3XrxHX8dTRrOKvYijKCGk_TvGKb9RctNBL8XDguS1slpSZJBBdFP56NJpFO_rul_JceGkyawS_07qNpbIwSjHyu0DaDedgJATSCTqGG9jZm4UJvhhFWJ-zgTeO3C1cCLvL_VFHMMzc7RqY2O5hjSwkut-WQfarfzeWFWQITKNcVrvwnL2Z7-tb1pBmOa1iogKKIaiwXaqVKgyQyZ_kEn81jjVMtioYafxe4_XE6rURSY-yDz76DpyO1BI4a7dZrW0ticQuHVbs",
        raised: 31000,
        goal: 35000,
        percentage: 88,
        category: 'Emergency',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '5',
        title: "Smart Mobility Innovation",
        description: "Investing in emerging assistive technologies that redefine what mobility and independence can look like.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
        raised: 14000,
        goal: 15000,
        percentage: 93,
        category: 'Mobility',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '6',
        title: "Emergency Medical Support Fund",
        description: "A flexible initiative designed to support urgent medical needs where timely resources can make a meaningful difference.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
        raised: 28000,
        goal: 28000,
        percentage: 100,
        category: 'Emergency',
        author: 'Initiative Fund',
        verified: true
    }
];

export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 'elena',
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
        name: "Mobility Program Outcome",
        detail: "Advanced prosthetic access improved independent movement.",
        fullStory: "A recent mobility initiative delivered advanced prosthetic technology and specialized therapy support. Participants reported improved independence and measurable gains in daily mobility.",
        highlights: [
            { label: "Mobility", before: "Limited movement", after: "Independent mobility" },
            { label: "Independence", before: "High assistance", after: "Self-directed care" }
        ]
    },
    {
        id: 'david',
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCON3XrxHX8dTRrOKvYijKCGk_TvGKb9RctNBL8XDguS1slpSZJBBdFP56NJpFO_rul_JceGkyawS_07qNpbIwSjHyu0DaDedgJATSCTqGG9jZm4UJvhhFWJ-zgTeO3C1cCLvL_VFHMMzc7RqY2O5hjSwkut-WQfarfzeWFWQITKNcVrvwnL2Z7-tb1pBmOa1iogKKIaiwXaqVKgyQyZ_kEn81jjVMtioYafxe4_XE6rURSY-yDz76DpyO1BI4a7dZrW0ticQuHVbs",
        name: "Rehabilitation Access Update",
        detail: "Expanded therapy access shortened recovery timelines.",
        fullStory: "Rehabilitation access programs expanded therapy capacity, reducing wait times and enabling faster recovery pathways for participants.",
        highlights: [
            { label: "Access", before: "Limited slots", after: "Expanded availability" },
            { label: "Outcomes", before: "Delayed recovery", after: "Improved progress" }
        ]
    },
    {
        id: 'marcus',
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9qb_2OkeyZUehBl9MkxHJvM8__qQV1motv7Qdo89uSCT7Q9maHudeGGKU1yoIxscEGT7s8k7JvZAfO-hi-YTbQR99-b9SZ_OYIFykkl7xj-j8n6LFMY08h4HTZ9bFvlHWnz1eJ4nFPaQ7VPa-8y6VJyJk-5DKC9VrXoG7MSUBFfI8kRU-AihzEN9MV8bqid3Cin0l1bWRg8372z9S8eI5DbTMmH4VHG-H4-HzdSE2YFGFhVXDpWtNv7t7vXSdOyPF43org201tyY",
        name: "Critical Equipment Deployment",
        detail: "Improved readiness for high-demand care environments.",
        fullStory: "Critical care equipment deployments supported facilities with essential tools, improving readiness and overall care quality in demanding settings.",
        highlights: [
            { label: "Capacity", before: "Limited tools", after: "Expanded equipment" },
            { label: "Readiness", before: "Delays", after: "Rapid response" }
        ]
    }
];
