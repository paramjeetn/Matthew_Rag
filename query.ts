import weaviate, { WeaviateClient } from "weaviate-ts-client";

// Initialize Weaviate client
const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: "gw5xkmqbqf6tskosysvfa.c0.asia-southeast1.gcp.weaviate.cloud",
  apiKey: new weaviate.ApiKey("k0Lb5WzpJM4JdG9APhQu29EraT5Zumvh7vCU"),
  headers: {
    "X-Google-Vertex-Api-Key": "AIzaSyBB5h_w4ZLG1CflivcMgKNE9x-y-yAD_Eo",
    "X-HuggingFace-Api-Key": "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",
  },
});
//Count total number of daa objects in collection
async function countTotalObjects() {
  const countResult = await client.graphql
    .aggregate()
    .withClassName("Matthew_Walker_small")
    .withFields("meta { count }")
    .do();

  const totalObjects = countResult.data.Aggregate.Matthew_Walker_small[0].meta.count;
  return totalObjects;
}

// Function to get Hybrid search results
async function getHybridResults(query: string) {
  const Hybrid_Result = await client.graphql
    .get()
    .withClassName("Matthew_Walker_small")
    .withFields("content title start duration _additional { score } ")
    .withHybrid({
      query: query,
      alpha: 0.9, 
    })
    .withLimit(4)
    .do();

  return Hybrid_Result;
}

// Function to get Keyword search results
async function getKeywordResults(query: string) {
  const Keyword_result = await client.graphql
    .get()
    .withClassName("Matthew_Walker_small")
    .withBm25({
      query: query,
    })
    .withLimit(4)
    .withFields("content title start duration")
    .do();

  return Keyword_result;
}

// Call and print results
async function main() {
  const user_input = "How many hours I should sleep?";

  // const totalObjects = await countTotalObjects();
  // console.log(`Total number of objects in 'Matthew_Walker_small': ${totalObjects}`);
  
  // ##############################################################################
  // OPENING THE HYBRID SEARCH TOO MUCH WILL CAUSE RATE LIMIT EXCEDDED BY HUGGING FACE API
  //IF RATE LIMIT IS EXCEDDED IT MAY TAKE 10-15 MINUTES TO RECOVER
  //#####################################################################################

  // Get and print Hybrid results
  // const hybridResults = await getHybridResults(user_input);
  // console.log("Hybrid Results:", JSON.stringify(hybridResults, null, 2));

  // Get and print Keyword results  
  // const keywordResults = await getKeywordResults(user_input);
  // console.log("Keyword Results:", JSON.stringify(keywordResults, null, 2));

}

// Execute the main function
main();

