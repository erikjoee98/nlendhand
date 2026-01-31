
import { Campaign, SuccessStory } from '../types';

export const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: '1',
        title: "Sarah's Road to Recovery",
        description: "Helping Sarah regain her mobility through advanced robotics and intensive physical therapy after a sudden spinal injury.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0z287pxiHhm0ACu4-6I4iquQ0GlR3_n0nl8xUfbNxiIQt_SVgfssF0gl8sTVUuVaWvsk0kusT-cA3TK44mpBYf8tmKTudih16XSHidJlrPstSjih1dmwQkQ5I3OYTkAdHhiIDODkzep61SeLQrl_x9J8juEhiIfiv5Zu2R8vsjcOg2F396omO1NlEQyfIdF8vPJBClgisAle8Gf7G6mxoG-_zhkHqCgolw70wwiY0j7F_h-OephL3KzP9RRP4qpRFru6pWo1AYIQ",
        raised: 45280,
        goal: 60000,
        percentage: 75,
        category: 'Mobility',
        author: 'John Johnson',
        verified: true
    },
    {
        id: '2',
        title: "Support Alex's Rehab",
        description: "Alex needs specialized daily therapy sessions to recover motor skills following a neuro-surgical procedure.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSAvXFeYtu79Gj3jVCuap6aWvxFPCIrtBAmGpMAGvyAFfZtphXESe7-RcXnK0L3Aty32kka-YRYki_l9885Lfr4rGlHv4UeYSZXTleb5bkcD9A1x2l22VsmqzLb7uRw47SnLQtIpD7Wr4ofROzCFOByUwNZIcsn6fD_v1DDBk4Bz5jdZRawYuMvO_YoOmsjrCPExP-o90wT0pX3sBTE_wDOvmsdQ8Qbzg1Hsb8mhKC55abaF95i1NmkkyTmzOUEx2IRErRBQ8xYF4",
        raised: 8200,
        goal: 10000,
        percentage: 82,
        category: 'Recovery',
        author: 'Rivera Family',
        verified: true
    },
    {
        id: '3',
        title: "Sophia's Pediatric Surgery",
        description: "Critical corrective surgery for 5-year-old Sophia to help her walk without assistance.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0z287pxiHhm0ACu4-6I4iquQ0GlR3_n0nl8xUfbNxiIQt_SVgfssF0gl8sTVUuVaWvsk0kusT-cA3TK44mpBYf8tmKTudih16XSHidJlrPstSjih1dmwQkQ5I3OYTkAdHhiIDODkzep61SeLQrl_x9J8juEhiIfiv5Zu2R8vsjcOg2F396omO1NlEQyfIdF8vPJBClgisAle8Gf7G6mxoG-_zhkHqCgolw70wwiY0j7F_h-OephL3KzP9RRP4qpRFru6pWo1AYIQ",
        raised: 12500,
        goal: 45000,
        percentage: 27,
        category: 'Emergency',
        author: 'Miriam Kim',
        verified: true
    },
    {
        id: '4',
        title: "Veteran David's Prosthetics",
        description: "Funding for next-generation bionic limbs for David, a veteran transitioning back to civilian life.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCON3XrxHX8dTRrOKvYijKCGk_TvGKb9RctNBL8XDguS1slpSZJBBdFP56NJpFO_rul_JceGkyawS_07qNpbIwSjHyu0DaDedgJATSCTqGG9jZm4UJvhhFWJ-zgTeO3C1cCLvL_VFHMMzc7RqY2O5hjSwkut-WQfarfzeWFWQITKNcVrvwnL2Z7-tb1pBmOa1iogKKIaiwXaqVKgyQyZ_kEn81jjVMtioYafxe4_XE6rURSY-yDz76DpyO1BI4a7dZrW0ticQuHVbs",
        raised: 31000,
        goal: 35000,
        percentage: 88,
        category: 'Mobility',
        author: 'Veteran Affairs NY',
        verified: true
    },
    {
        id: '5',
        title: "Elena's Running Goal",
        description: "Providing the specialized running blades Elena needs to return to the sports she loves.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
        raised: 14000,
        goal: 15000,
        percentage: 93,
        category: 'Recovery',
        author: 'Elena Rodriguez',
        verified: true
    },
    {
        id: '6',
        title: "Marcus: New Beginnings",
        description: "Complete home accessibility modification for Marcus to ensure safe and independent living.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
        raised: 28000,
        goal: 28000,
        percentage: 100,
        category: 'Mobility',
        author: 'Chen Family',
        verified: true
    }
];

export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 'elena',
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYfGq-w28cZ7cToX5xptnZP1urj_QTSP6Tetn2ZiVaVqHtxDiL-v949eLxUepqj61dJtLY75lYLrb6ntsgX5y8rnQlYGp6Y5QnCmsT2sz4_qbK-JPGJoD7vLPzU8tpcJNJesMS09ax8HCFsEFYPjRVG7vXJ9CZxsi7Lt3pUnHL8ZxpvJ5Wr03tHpdOmyeblGjqOQ_O9vlLC0KMKfgqMF0aAomw826ai2PLmJPACwwIZfvuxJPRfcQenItAD_E1TnfdF-7lBvmKLo0",
        name: "Elena's Milestone",
        detail: "Running again after 18 months of intensive rehab.",
        fullStory: "After a severe accident, Elena was told she might never walk unaided. Thanks to the mobility fund, she received custom carbon-fiber blades and dedicated therapy. Today, she is training for her first 5K race.",
        highlights: [
            { label: "Mobility", before: "Wheelchair bound", after: "Running 5km" },
            { label: "Independence", before: "Constant Care", after: "Fully Autonomous" }
        ]
    },
    {
        id: 'david',
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCON3XrxHX8dTRrOKvYijKCGk_TvGKb9RctNBL8XDguS1slpSZJBBdFP56NJpFO_rul_JceGkyawS_07qNpbIwSjHyu0DaDedgJATSCTqGG9jZm4UJvhhFWJ-zgTeO3C1cCLvL_VFHMMzc7RqY2O5hjSwkut-WQfarfzeWFWQITKNcVrvwnL2Z7-tb1pBmOa1iogKKIaiwXaqVKgyQyZ_kEn81jjVMtioYafxe4_XE6rURSY-yDz76DpyO1BI4a7dZrW0ticQuHVbs",
        name: "David's Return",
        detail: "Fully adapted back to home life with bionic mobility.",
        fullStory: "David served his country but lost his limb in the line of duty. The community came together to provide state-of-the-art bionic integration. David is now back to work and enjoying outdoor activities with his family.",
        highlights: [
            { label: "Integration", before: "Limited Movement", after: "Bionic Precision" },
            { label: "Employment", before: "On Leave", after: "Full-time Career" }
        ]
    },
    {
        id: 'marcus',
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9qb_2OkeyZUehBl9MkxHJvM8__qQV1motv7Qdo89uSCT7Q9maHudeGGKU1yoIxscEGT7s8k7JvZAfO-hi-YTbQR99-b9SZ_OYIFykkl7xj-j8n6LFMY08h4HTZ9bFvlHWnz1eJ4nFPaQ7VPa-8y6VJyJk-5DKC9VrXoG7MSUBFfI8kRU-AihzEN9MV8bqid3Cin0l1bWRg8372z9S8eI5DbTMmH4VHG-H4-HzdSE2YFGFhVXDpWtNv7t7vXSdOyPF43org201tyY",
        name: "Marcus's Progress",
        detail: "Home modifications complete; independence achieved.",
        fullStory: "Marcus faced immense challenges living in a multi-story home not equipped for his needs. Your donations enabled a full home remodel including ramps and a custom lift. Marcus now lives safely and independently.",
        highlights: [
            { label: "Environment", before: "Restricted Access", after: "Universal Design" },
            { label: "Well-being", before: "Social Isolation", after: "Active Community" }
        ]
    }
];