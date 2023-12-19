import getSortedPostsData, { getAllPostIds, getPostData } from "@/lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import postStyle from "../../styles/Post.module.css";
import Head from "next/head";

import React from "react";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
}

// 동적 라우팅이 필요할 때 getStaticPaths로 경로 리스트를 정의하고 HTML에 build 시간에 렌더됩니다.
// Nextjs 는 pre-render에서 정적으로 getStaticPaths에서 호출하는 경로들을 가져옵니다.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);

  return {
    props: {
      postData,
    },
  };
};
