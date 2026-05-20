import Hero from "../common/Hero";
import FeaturedCategories from "../common/FeaturedCategories";
import FeaturedCourses from "../common/FeaturedCourses";
import Layout from "../common/Layout";
import Testimonials from "../common/Testimonials";
import HowItWorks from "../common/HowItWorks";
import NewsLetter from "../common/NewsLetter";

function Home() {
      return (
            <Layout>

                  <Hero />
                  <FeaturedCategories />
                  <FeaturedCourses />
                  <HowItWorks />
                  <Testimonials />
                  <NewsLetter />
            </Layout>
      )
}

export default Home

