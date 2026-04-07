export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
};

export type Post = PostSummary & {
  coverLabel: string;
  intro: string;
  isUserCreated: boolean;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export type CreatePostInput = {
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  authorRole: string;
  coverLabel: string;
  intro: string;
  sectionHeading: string;
  body: string;
  bulletPoints?: string;
};

function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    publishedAt: post.publishedAt,
    author: post.author,
  };
}

let posts: Post[] = [
  {
    slug: "designing-editorial-interfaces-for-calm-reading",
    title: "Designing editorial interfaces for calm reading",
    excerpt:
      "How spacing, rhythm, and contrast help long-form content feel more inviting on the modern web.",
    category: "Design Systems",
    readTime: "6 min read",
    publishedAt: "April 4, 2026",
    author: {
      name: "Nina Porter",
      role: "Editorial Design Lead",
    },
    coverLabel: "Feature story",
    intro:
      "Readers decide whether to trust a publication long before they finish the first paragraph. The right interface creates a sense of calm, helping people settle in and stay focused.",
    isUserCreated: false,
    sections: [
      {
        heading: "Start with breathing room",
        paragraphs: [
          "Generous spacing does more than make a layout look expensive. It lets readers identify what matters first, which reduces cognitive overhead and creates a more confident scan path.",
          "When hero areas, cards, and article bodies each have their own rhythm, the page feels composed rather than crowded. That composure becomes part of the brand.",
        ],
      },
      {
        heading: "Use contrast as a guide, not a gimmick",
        paragraphs: [
          "The best editorial surfaces combine soft backgrounds with sharper moments of emphasis. A loud interface can be memorable, but a guided interface is what keeps people reading.",
          "Think in layers: background atmosphere, card surfaces, headline contrast, and accent actions. Each layer should reinforce hierarchy without competing for attention.",
        ],
        bullets: [
          "Reserve the strongest color for calls to action and active states.",
          "Keep supporting copy slightly muted so headings can lead naturally.",
          "Use border and shadow changes sparingly to preserve clarity.",
        ],
      },
      {
        heading: "Reading is a product experience",
        paragraphs: [
          "A great blog is not just a list of posts. It is a sequence of moments: discovery, curiosity, commitment, and completion. Treating that journey intentionally unlocks better dwell time and stronger return visits.",
          "That is why article pages should feel like destinations, not leftovers. The transition from archive to detail view needs the same care as a checkout or onboarding flow.",
        ],
      },
    ],
  },
  {
    slug: "server-rendering-that-still-feels-instant",
    title: "Server rendering that still feels instant",
    excerpt:
      "A practical pattern for combining request-time rendering with client hydration so content is fast and fresh.",
    category: "Engineering",
    readTime: "8 min read",
    publishedAt: "April 2, 2026",
    author: {
      name: "Avery Chen",
      role: "Frontend Engineer",
    },
    coverLabel: "SSR guide",
    intro:
      "Rendering on the server is about more than SEO. It helps pages arrive meaningful from the first byte, especially when the experience depends on content rather than app chrome.",
    isUserCreated: false,
    sections: [
      {
        heading: "Render the first meaningful state on the server",
        paragraphs: [
          "If the homepage is essentially an archive, users benefit from receiving the article list immediately. This avoids loading spinners for primary content and gives crawlers complete markup to index.",
          "The trick is keeping the page interactive afterward. Hydrating a shared cache is often cleaner than re-fetching from scratch after mount.",
        ],
      },
      {
        heading: "Hydration should feel like continuity",
        paragraphs: [
          "React Query works nicely here because the server can prefill the cache and the client can keep using the same query key. That means search, focus refetching rules, and caching policies all stay centralized.",
          "You end up with a page that feels server-rendered at entry and application-like once the user begins exploring.",
        ],
      },
      {
        heading: "Keep your data shape stable",
        paragraphs: [
          "SSR gets brittle when server and client payloads drift. A shared data function or a shared contract keeps rendering predictable and makes dynamic routes easier to maintain.",
        ],
      },
    ],
  },
  {
    slug: "how-small-teams-build-consistent-content-engines",
    title: "How small teams build consistent content engines",
    excerpt:
      "Editorial consistency rarely comes from scale alone. It comes from systems that make good publishing habits easy.",
    category: "Operations",
    readTime: "5 min read",
    publishedAt: "March 29, 2026",
    author: {
      name: "Mila Santos",
      role: "Content Strategist",
    },
    coverLabel: "Operations",
    intro:
      "Most lean teams do not need more ideas. They need a publishing engine that reduces friction between drafting, reviewing, and shipping a story.",
    isUserCreated: false,
    sections: [
      {
        heading: "Consistency beats intensity",
        paragraphs: [
          "A single repeatable format can outperform a flood of disconnected experiments. Readers learn what to expect, and contributors spend less time reinventing the workflow.",
          "Templates, category rules, and clear editorial ownership turn momentum into a habit.",
        ],
      },
      {
        heading: "Systems create creative freedom",
        paragraphs: [
          "When the mechanics are predictable, writers can spend their energy on stronger stories. A clean CMS, a reliable review loop, and a visible content calendar do more for quality than endless brainstorming sessions.",
        ],
      },
    ],
  },
  {
    slug: "building-search-that-respects-reader-intent",
    title: "Building search that respects reader intent",
    excerpt:
      "Fast filtering feels smarter when the UI explains what is happening and keeps results close at hand.",
    category: "UX",
    readTime: "4 min read",
    publishedAt: "March 25, 2026",
    author: {
      name: "Rowan Blake",
      role: "Product Designer",
    },
    coverLabel: "UX patterns",
    intro:
      "Search is one of the quickest ways to turn a passive archive into an active tool. The best experiences feel immediate, legible, and forgiving.",
    isUserCreated: false,
    sections: [
      {
        heading: "Make the input feel local and responsive",
        paragraphs: [
          "For modest datasets, client-side filtering is often enough. Pairing a deferred value with clear result feedback keeps keystrokes responsive while reassuring the user that the list is updating.",
        ],
      },
      {
        heading: "Explain the results state",
        paragraphs: [
          "A live region that announces the number of matches can improve accessibility while also making the interface feel more explicit for everyone. Good search feedback is not decoration. It is orientation.",
        ],
      },
    ],
  },
  {
    slug: "crafting-article-pages-with-strong-seo-foundations",
    title: "Crafting article pages with strong SEO foundations",
    excerpt:
      "Metadata, semantics, and structured data all play a role in helping stories travel further.",
    category: "SEO",
    readTime: "7 min read",
    publishedAt: "March 21, 2026",
    author: {
      name: "Iris Kim",
      role: "Technical SEO Editor",
    },
    coverLabel: "SEO deep dive",
    intro:
      "Search optimization is often treated like a separate layer, but strong SEO begins in the same place as good UX: clear structure and useful content.",
    isUserCreated: false,
    sections: [
      {
        heading: "Semantics help both people and crawlers",
        paragraphs: [
          "Headings, metadata, and article landmarks are not just best-practice checkboxes. They help browsers, assistive tech, and search engines understand what the page is trying to do.",
        ],
      },
      {
        heading: "Structured data adds clarity",
        paragraphs: [
          "Schema markup gives article pages extra context. It is especially useful when you can clearly define the headline, author, publication date, and canonical destination.",
        ],
      },
    ],
  },
  {
    slug: "the-case-for-tactile-digital-branding",
    title: "The case for tactile digital branding",
    excerpt:
      "Soft gradients, warm surfaces, and typographic contrast can make product experiences feel more human.",
    category: "Brand",
    readTime: "5 min read",
    publishedAt: "March 18, 2026",
    author: {
      name: "Theo Grant",
      role: "Brand Designer",
    },
    coverLabel: "Brand story",
    intro:
      "Digital products are often optimized for clarity and speed, but personality matters too. Texture and tone can help an interface feel memorable without becoming noisy.",
    isUserCreated: false,
    sections: [
      {
        heading: "Atmosphere creates recall",
        paragraphs: [
          "Color, depth, and type choices can make a reading experience feel more tactile and less disposable. That emotional layer is often what separates a polished product from a merely functional one.",
        ],
      },
    ],
  },
  {
    slug: "why-related-reading-should-never-feel-random",
    title: "Why related reading should never feel random",
    excerpt:
      "The handoff from one story to the next is a core part of retention, not an afterthought below the fold.",
    category: "Growth",
    readTime: "6 min read",
    publishedAt: "March 15, 2026",
    author: {
      name: "June Ellis",
      role: "Audience Growth Lead",
    },
    coverLabel: "Growth insights",
    intro:
      "Related content modules work best when they feel editorially intentional. Readers are more likely to continue when the next recommendation clearly fits the story they just finished.",
    isUserCreated: false,
    sections: [
      {
        heading: "Match mood and topic",
        paragraphs: [
          "A relevant handoff might share a category, but it can also share pacing, audience, or point of view. The recommendation should feel like an invitation, not a guess.",
        ],
      },
    ],
  },
  {
    slug: "modern-react-features-that-improve-reading-products",
    title: "Modern React features that improve reading products",
    excerpt:
      "A few newer APIs can quietly make editorial interfaces smoother, more resilient, and easier to maintain.",
    category: "React",
    readTime: "7 min read",
    publishedAt: "March 12, 2026",
    author: {
      name: "Sage Monroe",
      role: "Senior React Developer",
    },
    coverLabel: "React patterns",
    intro:
      "Modern React features are most compelling when they disappear into the experience. The goal is not to show off APIs, but to reduce friction for the person reading.",
    isUserCreated: false,
    sections: [
      {
        heading: "Use concurrency where it matters",
        paragraphs: [
          "Transitions and deferred values are especially helpful around search, filtering, and archive interactions. They preserve responsiveness while allowing the UI to update intelligently.",
        ],
      },
      {
        heading: "Server and client can each do their best work",
        paragraphs: [
          "Server components are great for delivering content fast. Client components are excellent for exploration and personalization. A polished blog usually needs both.",
        ],
      },
    ],
  },
];

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPostSummaries(): Promise<PostSummary[]> {
  return posts.map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return posts.find((post) => post.slug === slug);
}

export async function getRelatedPosts(slug: string, category: string) {
  return posts.filter((post) => post.slug !== slug && post.category === category).slice(0, 3).map(toSummary);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createUniqueSlug(title: string) {
  const baseSlug = slugify(title) || "untitled-story";
  let slug = baseSlug;
  let index = 2;

  while (posts.some((post) => post.slug === slug)) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  return slug;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const paragraphs = input.body
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const bullets = (input.bulletPoints ?? "")
    .split("\n")
    .map((bullet) => bullet.trim())
    .filter(Boolean);

  const post: Post = {
    slug: createUniqueSlug(input.title),
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    category: input.category.trim(),
    readTime: `${Math.max(4, Math.ceil(input.body.trim().split(/\s+/).length / 180))} min read`,
    publishedAt: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date()),
    author: {
      name: input.authorName.trim(),
      role: input.authorRole.trim(),
    },
    coverLabel: input.coverLabel.trim(),
    intro: input.intro.trim(),
    isUserCreated: true,
    sections: [
      {
        heading: input.sectionHeading.trim(),
        paragraphs,
        bullets: bullets.length ? bullets : undefined,
      },
    ],
  };

  posts = [post, ...posts];

  return post;
}

export async function deletePost(slug: string) {
  const post = posts.find((entry) => entry.slug === slug);

  if (!post || !post.isUserCreated) {
    return false;
  }

  posts = posts.filter((entry) => entry.slug !== slug);
  return true;
}
