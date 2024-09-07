import FeatureCard from "@/components/cards/featureCard";

const FeatureSection = () => {
  return (
    <article className="py-14">
      <section className="safe-area grid gap-4 justify-items-center">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => {
            return (
              <FeatureCard
                key={item + index}
                title="Ramesh Prasai"
                description="Our Step #1 on collecting the items from your door place"
              />
            );
          })}
        </div>
      </section>
    </article>
  );
};

export default FeatureSection;
