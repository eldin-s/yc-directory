import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import { SplitText } from "@/components/SplitText";

import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container relative">
        <div className="absolute inset-0 bg-black/80 w-full h-full z-0"></div>

        <h1 className="heading z-10">
          <SplitText text="Showcase Your Startup, Connect with Visionaries" />
        </h1>
        <p className="sub-heading !max-w-3xl z-10">
          Share Innovations, Gain Votes, and Shine in Startup Challenges
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold text-center uppercase">
          {query ? `"Search results for ${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results"></p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
