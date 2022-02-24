import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { sanityClient, urlFor } from "../sanity"
import { Post } from "../typings"
import Header from '../components/Header'

interface Props {
  posts: [Post]
}

const Home: NextPage = ({posts}: Props) => {
  console.log(posts)
  return (
    <div className="mx-auto max-w-6xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="py:py-0 flex items-center justify-between border-y border-black bg-yellow-400 py-10">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to read, write and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers
          </h2>
        </div>
        <img
          className="hidden h-32 md:inline-flex lg:h-full"
          src="https://thakkaronak.github.io/ThakkarRonak/img/medium.png"
          alt=""
        />
      </div>
    {/*Posts*/}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
      {posts.map(post => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="border rounded-lg group cursor-pointer overflow-hidden">
            <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" src={urlFor(post.mainImage).url()!} alt=""/>
            <div className="flex justify-between p-5 bg-white">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-sm">{post.description} by {post.author.name}</p>
              </div>
              <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} alt=""/>
            </div>

          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
      _id,
      title,
      slug,
      author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}
