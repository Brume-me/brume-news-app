export type Vote = 'upvote' | 'downvote';

export type VoteResponse = {
  articleId: string;
  upvotes: number;
  downvotes: number;
  userVote: Vote;
};

export const getArticleVotes = async (articleId: string): Promise<VoteResponse> => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  const params = new URLSearchParams();

  return await $fetch(`/articles/${articleId}/votes${params.toString() ? `?${params}` : ''}`, {
    baseURL,
    credentials: 'include'
  });
};

export const addArticleVote = async (articleId: string, vote?: Vote) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl;

  return await $fetch(`/articles/${articleId}/votes`, {
    baseURL,
    credentials: 'include',
    method: 'POST',
    body: { vote }
  });
};
