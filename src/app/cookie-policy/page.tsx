import { Text, Title } from '@mantine/core';

const CookiePolicy = () => {
  return (
    <main className="safe-area mx-auto my-8">
      <Title className="text-center">Cookies Policy of Cargosender</Title>
      <div className="grid gap-2 mb-8">
        <Title order={3} className="mt-4">
          Introduction
        </Title>
        <Text>
          Your privacy is important to us at Cargosender. We invite you to read this Cookies Policy, along with our
          Privacy Policy and Terms & Conditions, to understand how we handle your information. By accessing and using
          our website, you explicitly agree to this policy and our Terms & Conditions. We may update this Cookies Policy
          from time to time, and any changes will be posted on our website at www.cargosender.com. We recommend
          reviewing the policy periodically for the latest updates. This policy was last updated on 2024.
        </Text>
        <Title order={3} className="mt-4">
          What Are Cookies?
        </Title>
        <Text>
          Cookies are small text files stored on your device that can be retrieved by a web server in the domain that
          placed the cookie. They typically consist of letters and numbers identifying your computer, and they may also
          contain additional information such as statistical data, user preferences (like language or currency), and
          more. Cookies are created when you visit a website or service that uses them. They enhance your browsing
          experience by providing useful information about your interactions with our website. Some cookies may be
          placed by third parties acting on our behalf. Its essential to understand the distinction between session
          cookies and persistent cookies. Session cookies exist only until you close your browser, while persistent
          cookies remain on your device until they expire or are deleted. We strive to limit the lifespan of cookies to
          a maximum of 2 years, except in exceptional circumstances where a longer lifespan is necessary for security
          purposes. For more information about cookies and how to delete or disable them, please visit
          www.aboutcookies.org.
        </Text>
        <Title order={3} className="mt-4">
          What Is Local Storage?
        </Title>
        <Text>
          Local storage is another way websites store data on your device. It includes various file types, with cookies
          being just one of them. Some websites utilize the browsers sessionStorage and localStorage features. While
          sessionStorage is temporary, localStorage is persistent. You can delete these files by clearing your browsers
          history.
        </Text>
        <Title order={3} className="mt-4">
          How Does Cargosender Use Cookies?
        </Title>
        <Text>
          Our website, www.cargosender.com, uses cookies to identify your computer and improve your user experience.
          These cookies help us enhance our services by analyzing how you interact with our site. Unless you adjust your
          browser settings to refuse cookies, our system will issue cookies as soon as you visit our website. Note that
          some functionalities may not be available if cookies are disabled. The cookies we use only collect anonymous
          information to optimize our services and do not collect personal information. Our Cookies Usage Includes:
        </Text>
        <ul>
          <li>
            <Text className="font-bold">Analytical Cookies:</Text>
            <Text>
              These cookies help us recognize and count visitors, track how they navigate our website, and determine
              which content is most popular. This information allows us to improve our services and ensure users can
              find the information they need. We may provide anonymized demographic data to third parties for targeted
              advertising and campaign effectiveness tracking.
            </Text>
          </li>
          <li>
            <Text className="font-bold">Functional Cookies:</Text>
            <Text>
              Functional cookies enhance our websites functionalities, allowing us to:
              <ul>
                <li>Carry information across different pages to avoid re-entering data.</li>
                <li>
                  Remember your preferences, such as preferred language or currency. We may also use local storage to
                  save information about incomplete orders to assist you in case of any issues during the checkout
                  process.
                </li>
              </ul>
            </Text>
          </li>
        </ul>
        <Title order={3} className="mt-4">
          Third-Party Advertisements:
        </Title>
        <Text>
          We collaborate with trusted third-party companies for online advertising, adhering to industry standards and
          codes of conduct.
        </Text>
        <Title order={3} className="mt-4">
          Analytics:
        </Title>
        <Text>
          We use analytical software such as Google Analytics to collect data for improving our website. You can opt-out
          of Google Analytics through the Google Analytics Opt-out Browser Add-on (for desktop).
        </Text>
        <Title order={3} className="mt-4">
          Where Can I Find More Information About Cookies?
        </Title>
        <Text>
          Most web browsers automatically accept cookies but provide settings to block or delete them. You can usually
          block cookies by adjusting your browser settings. However, blocking all cookies may restrict your access to
          certain parts of our website and affect functionality. For additional privacy controls that may impact
          cookies, please refer to our Privacy Policy and Terms & Conditions. If you have any questions regarding this
          Cookies Policy, please contact us at Contact@cargosender.com. This Cookies Policy may be amended from time to
          time, so we encourage you to check this page regularly for updates.
        </Text>
      </div>
    </main>
  );
};

export default CookiePolicy;
