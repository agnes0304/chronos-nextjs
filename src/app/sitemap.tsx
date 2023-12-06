import { MetadataRoute } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Post = {
  id: number;
  title: string;
  body: string;
  filename: string;
  filename_ex: string;
  bloglink: string;
  createdAt: string;
  isPaid: boolean;
  price: number;
};

async function getAllPostIds() {
  const res = await fetch(`${baseUrl}/posts`, {
    method: "GET",
  });
  const data = await res.json();
  const postIds = data.map((post: Post) => post.id);
  return postIds;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postIds = await getAllPostIds();
  const postsSitemap = postIds.map((id:number) => ({
    url: `https://chronos.jiwoo.best/posts/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const adminPostsSitemap = postIds.map((id:number) => ({
    url: `https://chronos.jiwoo.best/admin/posts/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://chronos.jiwoo.best",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://chronos.jiwoo.best/posts",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://chronos.jiwoo.best/payment",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://chronos.jiwoo.best/payment/confirm",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://chronos.jiwoo.best/payment/success",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: "https://chronos.jiwoo.best/admin",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://chronos.jiwoo.best/admin/order",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
    {
      url: "https://chronos.jiwoo.best/admin/posts",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
    {
      url: "https://chronos.jiwoo.best/admin/posts/new",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...postsSitemap,
    ...adminPostsSitemap,
  ];
}
