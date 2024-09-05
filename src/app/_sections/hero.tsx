import { Icon } from "@iconify/react/dist/iconify.js";
import { Title } from "@mantine/core";

const HeroSection = () => {
  return (
    <section className="bg-gray-300">
      <div className="safe-area grid grid-cols-2 align-middle gap-4 bg-gray-100 min-h-[calc(100vh-3rem)]">
        <div className="bg-blue-100 flex flex-col align-top">
          <div className="with-icon">
            Rate 4.8/5 on
            <Icon className="text-green-600" icon="simple-icons:trustpilot" />
            Trustpilot
          </div>
          <Title className="text-6xl">
            Save on Global shipping with BetterSender
          </Title>
          <div className="grid">
            <li>Easy Ordering</li>
            <li>Trusted Carriers</li>
            <li>Same day response</li>
          </div>
        </div>
        <div className="bg-blue-100"></div>
      </div>
    </section>
  );
};

export default HeroSection;
