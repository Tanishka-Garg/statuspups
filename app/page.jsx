import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Share and Discover
      <br className="max-md:hidden"/> 
      <span className="orange_gradient text-center">AI Prompts</span>
      </h1>
      <p className="desc text-center">Join the PromptX community, a vibrant space for sharing and exploring the power of AI prompts.</p>
      <Feed/>
    </section>
  )
}

export default Home
