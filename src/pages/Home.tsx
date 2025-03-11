import React from 'react';
import Hero from '../components/Hero';
import FeaturedProject from '../components/home/FeaturedProject';
import OnboardingForm from '../components/home/onboarding/OnboardingForm';
import BlogPreview from '../components/home/BlogPreview';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <section className="py-24 bg-gradient-to-b from-black to-deep-brown-300">
        <div className="container mx-auto px-4">
          <OnboardingForm />
        </div>
      </section>
      <BlogPreview />
    </>
  );
};

export default Home;