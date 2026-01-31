import type { Campaign, SuccessStory } from "../types";
import { prisma } from "./db";

const mapCampaign = (campaign: {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  verified: boolean;
  goalCents: number;
  raisedCents: number;
}) => {
  const goal = campaign.goalCents / 100;
  const raised = campaign.raisedCents / 100;
  const percentage =
    campaign.goalCents > 0
      ? Math.min(100, Math.round((campaign.raisedCents / campaign.goalCents) * 100))
      : 0;

  const mapped: Campaign = {
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    image: campaign.image,
    category: campaign.category,
    author: campaign.author,
    verified: campaign.verified,
    goal,
    raised,
    percentage,
  };

  return mapped;
};

const mapSuccessStory = (story: {
  id: string;
  name: string;
  detail: string;
  fullStory: string;
  img: string | null;
  highlights: unknown;
}) => {
  const mapped: SuccessStory = {
    id: story.id,
    name: story.name,
    detail: story.detail,
    fullStory: story.fullStory,
    img: story.img || "",
    highlights: Array.isArray(story.highlights)
      ? (story.highlights as SuccessStory["highlights"])
      : [],
  };

  return mapped;
};

export async function getActiveCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    where: { isActive: true },
    orderBy: [{ createdAt: "desc" }],
  });
  return campaigns.map(mapCampaign);
}

export async function getCampaignById(id: string) {
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  return campaign ? mapCampaign(campaign) : null;
}

export async function getSuccessStories() {
  const stories = await prisma.successStory.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  return stories.map(mapSuccessStory);
}

export async function getSuccessStoryById(id: string) {
  const story = await prisma.successStory.findUnique({ where: { id } });
  return story ? mapSuccessStory(story) : null;
}
