import Hero from "../common/Hero";
import FeaturedCategories from "../common/FeaturedCategories";
import FeaturedCourses from "../common/FeaturedCourses";
import Layout from "../common/Layout";

function Home() {
      return (
            <Layout>
                  <Hero />
                  <FeaturedCategories />
                  <FeaturedCourses />
            </Layout>
      )
}

export default Home