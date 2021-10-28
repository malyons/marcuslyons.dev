import React from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { getAllPosts, getSinglePost } from "../../utils/mdx"
import { Post as PostLayout } from "../../components/layouts/post"

const Post = ({ code, frontmatter }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <>
      <PostLayout>
        <article>
          <h2>{frontmatter.title}</h2>
          <Component />
        </article>
      </PostLayout>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug)
  return {
    props: { ...post },
  }
}

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export default Post
