import client from "@sanity/client";

export const sanityClient = client({
  projectId: "ier5kzcd",
  dataset: "production", // this is from those question during 'sanity init'
  apiVersion: "2021-03-25",
  // eslint-disable-next-line max-len
  token: "skAMmCO0XrAyClIdOJsUr6juUIiMDMnvLoULDQT3bw9gjfRMQSqXeOuCgwsSWLepNjFdTFnRgQqtIuRibCxiG6GjFgcyX4y4nXZcb6tDqrXiW8a8K7h3gEdzGTEYkajIbfDxasQY51shKiM3D3Iog3nMZtSwTv4Yn0eHwFHm8sqcrMfoBiFe",
  useCdn: false,
});

// eslint-disable-next-line
export default {sanityClient};
