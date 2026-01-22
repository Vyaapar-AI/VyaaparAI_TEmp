'use server';

/**
 * @fileOverview AI-powered product recommendations flow.
 *
 * This file defines a Genkit flow that provides product recommendations to users based on their browsing history and preferences.
 * The flow takes user preferences as input and returns a list of recommended products.
 *
 * @fileOverview A plant problem diagnosis AI agent.
 * - getAIProductRecommendations - A function that handles the product recommendation process.
 * - AIProductRecommendationsInput - The input type for the getAIProductRecommendations function.
 * - AIProductRecommendationsOutput - The return type for the getAIProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProductRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the users past orders and general preferences.'
    ),
  numberOfRecommendations: z.number().describe('The number of recommendations to generate.'),
});
export type AIProductRecommendationsInput = z.infer<typeof AIProductRecommendationsInputSchema>;

const AIProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended products based on user preferences.'),
});
export type AIProductRecommendationsOutput = z.infer<typeof AIProductRecommendationsOutputSchema>;

export async function getAIProductRecommendations(input: AIProductRecommendationsInput): Promise<AIProductRecommendationsOutput> {
  return aiProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductRecommendationsPrompt',
  input: {schema: AIProductRecommendationsInputSchema},
  output: {schema: AIProductRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant for a bakery.

Based on the user's past orders and preferences, recommend {{numberOfRecommendations}} products that they might like.

User Preferences: {{{userPreferences}}}

Respond with a numbered list of product names. Do not provide any additional explanation or context. The products should be different from the products that the user has already ordered.
`,
});

const aiProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiProductRecommendationsFlow',
    inputSchema: AIProductRecommendationsInputSchema,
    outputSchema: AIProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
