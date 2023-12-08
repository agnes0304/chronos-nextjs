import axios from "axios";
import Image from "next/image";
import Fdate from "@/components/Fdate";
import Actions from "@/components/post/Actions";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverSiteVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;
const googleAdsenseAcount= process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT

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

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = params.id;
  const res = await axios.get(`${baseUrl}/posts/${id}`);
  const post = res.data;

  const url = `https://chronos.jiwoo.best/posts/${id}`;

  return {
    title: `필기깎는화석 | ${post.title}`,
    description: post.body,
    verification: {
      google: googleSiteVerification,
      other: {
        "naver-site-verification": naverSiteVerification || "",
        "google-adsense-account": googleAdsenseAcount || "",
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: url,
      siteName: "필기깎는화석 | Chronos",
      images: [`/${post.filename}.webp`],
      locale: "en_US",
      type: "website",
    },
  };
}

async function getPost(param: string) {
  const paramId = Number(param);
  try {
    const res = await axios.get(`${baseUrl}/posts/${paramId}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

const Post = async ({ params }: Props) => {
  let data: Post = {
    id: 0,
    title: "",
    body: "",
    filename: "",
    filename_ex: "",
    bloglink: "",
    createdAt: "",
    isPaid: false,
    price: 0,
  };

  try {
    if (typeof params.id === "string") {
      data = await getPost(params.id);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return (
    <article className="w-[90vw] h-[100vh] flex flex-col justify-start gap-2 pb-[100px] lg:w-[70%] lg:mx-auto">
      <div>
        <h1 className="text-lg text-gray-400">{data.title}</h1>
        <div className="text-xs font-light text-gray-400 text-right">
          <Fdate dateStr={data.createdAt} />
        </div>
      </div>
      <div className="flex justify-center items-center w-full object-cover">
        <Image
          src={`/${data.filename}.webp`}
          layout="responsive"
          width={100}
          height={100}
          objectFit="cover"
          objectPosition="center"
          alt={`${data.filename} image`}
        />
      </div>
      <div>
        <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
      <Actions
        fileName={data.filename_ex}
        blogLink={data.bloglink}
        isPaid={data.isPaid}
        title={data.title}
      />
    </article>
  );
};

export default Post;
