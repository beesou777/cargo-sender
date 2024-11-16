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
                title="Save upto 50% on shipping costs"
                description="Save on Worldwide shipping with Cargosender"
              />
            );
          })}
        </div>
      </section>
    </article>
  );
};

export default FeatureSection;
