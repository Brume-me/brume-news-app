export type Vote = 'upvote' | 'downvote';

export type VoteResponse = {
  articleId: string;
  upvotes: number;
  downvotes: number;
  userVote: Vote;
};

export const getArticleVotes = async (articleId: string, userHash: string): Promise<VoteResponse> => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  const params = new URLSearchParams();
  if (userHash) params.set('userHash', userHash);

  return await $fetch(`/articles/${articleId}/votes${params.toString() ? `?${params}` : ''}`, { baseURL });
};

export const addArticleVote = async (articleId: string, userHash: string, vote?: Vote) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  return await $fetch(`/articles/${articleId}/votes`, {
    baseURL,
    method: 'POST',
    body: { userHash, vote }
  });
};
