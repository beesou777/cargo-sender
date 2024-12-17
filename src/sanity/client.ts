// client.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "./env";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const sanityClient = createClient({
  apiVersion: "1",
  projectId, // you can find this in sanity.json
  dataset, // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
});

export const sanityImage = (source: SanityImageSource) => {
  const builder = imageUrlBuilder(sanityClient);
  return builder.image(source);
};

export default sanityClient;
