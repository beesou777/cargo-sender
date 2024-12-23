import { Title } from "@mantine/core";
import { CONTENT } from "./content";

const TermsAndConditions = () => {
  return (
    <main className="safe-area mx-auto my-8">
      <Title className="text-center">Terms and Conditions</Title>
      <div className="whitespace-pre-wrap ">{CONTENT}</div>
    </main>
  );
};

export default TermsAndConditions;
