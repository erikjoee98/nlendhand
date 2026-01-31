import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { MOCK_CAMPAIGNS, MOCK_SUCCESS_STORIES } from "../lib/mockData";

const directUrl =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;

if (!directUrl) {
  throw new Error("DATABASE_URL or POSTGRES_URL is required for seeding.");
}

const adapter = new PrismaPg({
  connectionString: directUrl,
});

// PrismaClient inicializálása az adapterrel
const prisma = new PrismaClient({
  log: ["error", "warn"],
  adapter,
});

const dollarsToCents = (value: number) => Math.round(value * 100);

async function main() {
  // Betöltjük a kampányokat
  for (const campaign of MOCK_CAMPAIGNS) {
    const goalCents = dollarsToCents(campaign.goal);
    const raisedCents = dollarsToCents(campaign.raised);
    const isActive = campaign.percentage < 100 && raisedCents < goalCents;

    await prisma.campaign.upsert({
      where: { id: campaign.id },
      update: {
        title: campaign.title,
        description: campaign.description,
        image: campaign.image,
        category: campaign.category,
        author: campaign.author || "Unknown",
        verified: Boolean(campaign.verified),
        goalCents,
        raisedCents,
        isActive,
      },
      create: {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        image: campaign.image,
        category: campaign.category,
        author: campaign.author || "Unknown",
        verified: Boolean(campaign.verified),
        goalCents,
        raisedCents,
        isActive,
      },
    });
  }

  // Betöltjük a siker történeteket
  for (const story of MOCK_SUCCESS_STORIES) {
    await prisma.successStory.upsert({
      where: { id: story.id },
      update: {
        name: story.name,
        detail: story.detail,
        fullStory: story.fullStory,
        img: story.img,
        highlights: story.highlights,
      },
      create: {
        id: story.id,
        name: story.name,
        detail: story.detail,
        fullStory: story.fullStory,
        img: story.img,
        highlights: story.highlights,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
