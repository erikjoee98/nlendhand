
import { Campaign, SuccessStory } from '../types';

const LAB_IMAGE =
    "https://cdn.pixabay.com/photo/2013/02/10/22/26/arabian-gulf-80359_1280.jpg";
const MRI_IMAGE =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDRbn8icngBRDXuH4TA3s3mqk0IFOpEdmAkldd8bnvCxvIDjCUJSJW2DmWF0nUneF3iIYKBNrhjgI1Xa_NcRqYVbFTOsUfdUgYxGu1IHG6o5Dmovpf4SpRmmE0biwzofXVOQHD5fwbdpztADx1pAU51k5Pc8yZq7M2tQe79NlMN6oRFI2rz8wJ2LcQ7pVO8X6hI84K5Nl_sybm9T6Yid_kBi5gB9evFNwZ12eEoTuuItsS6mhSDdjcvbcQwiYt-OqChyq2VZJkCstk";
const ONCOLOGY_IMAGE =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCbJu09WO2edRjGmL5zMuyQsBH0aKiikE2jnVs8N5m1m0pp-faqOw-33seEW0rhwFHPojyrI1JI_v8BFDSPsp1A0TUk0DcAZ-bJ-jpu5BTzlK4BGG6ACkLY_Jy7qRW03zaitqZuFg9sbG_0uY8XzL1crm8SrOFp1T5DvQH8H2TA_j1ACoP45OubKem4JasVAioCljT3FmH51SCOWiYt77Omj2JNkpNtQ5P3cSHfYUaVJ4eEZf-qtLNZCTeqo8SxCJyr_2HUivlClV8";
const PROSTHETIC_IMAGE = "/prosthetic.jpg";
const PEDIATRIC_MOBILITY_IMAGE =
    "https://cdn.pixabay.com/photo/2024/03/13/09/00/child-8630542_1280.jpg";
const REHAB_IMAGE =
    "https://cdn.pixabay.com/photo/2024/01/19/07/44/clinic-8518335_1280.jpg";
const EMERGENCY_SUPPORT_IMAGE = LAB_IMAGE;
const SMART_MOBILITY_IMAGE = ONCOLOGY_IMAGE;
const CRITICAL_CARE_IMAGE = MRI_IMAGE;


export const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: '1',
        title: "Advanced Prosthetic Technology Fund",
        description: "This initiative supports access to next-generation prosthetic technology designed to restore mobility, independence, and quality of life.",
        image: PROSTHETIC_IMAGE,
        raised: 1800,
        goal: 60000,
        percentage: 3,
        category: 'Mobility',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '2',
        title: "Pediatric Mobility Equipment",
        description: "Focused on expanding access to specialized mobility equipment that enables children with physical challenges to move freely and confidently.",
        image: PEDIATRIC_MOBILITY_IMAGE,
        raised: 1500,
        goal: 10000,
        percentage: 15,
        category: 'Mobility',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '3',
        title: "Rehabilitation Access Program",
        description: "Supporting critical rehabilitation resources that help individuals recover faster and regain independence after serious injury.",
        image: REHAB_IMAGE,
        raised: 1200,
        goal: 45000,
        percentage: 3,
        category: 'Recovery',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '4',
        title: "Critical Care Equipment Fund",
        description: "Helping expand access to essential medical equipment that supports high-quality patient care in demanding environments.",
        image: CRITICAL_CARE_IMAGE,
        raised: 1900,
        goal: 35000,
        percentage: 5,
        category: 'Emergency',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '5',
        title: "Smart Mobility Innovation",
        description: "Investing in emerging assistive technologies that redefine what mobility and independence can look like.",
        image: SMART_MOBILITY_IMAGE,
        raised: 1600,
        goal: 15000,
        percentage: 11,
        category: 'Mobility',
        author: 'Initiative Fund',
        verified: true
    },
    {
        id: '6',
        title: "Emergency Medical Support Fund",
        description: "A flexible initiative designed to support urgent medical needs where timely resources can make a meaningful difference.",
        image: EMERGENCY_SUPPORT_IMAGE,
        raised: 2000,
        goal: 28000,
        percentage: 7,
        category: 'Emergency',
        author: 'Initiative Fund',
        verified: true
    }
];

export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 'elena',
        img: LAB_IMAGE,
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
        img: MRI_IMAGE,
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
        img: ONCOLOGY_IMAGE,
        name: "Critical Equipment Deployment",
        detail: "Improved readiness for high-demand care environments.",
        fullStory: "Critical care equipment deployments supported facilities with essential tools, improving readiness and overall care quality in demanding settings.",
        highlights: [
            { label: "Capacity", before: "Limited tools", after: "Expanded equipment" },
            { label: "Readiness", before: "Delays", after: "Rapid response" }
        ]
    }
];
