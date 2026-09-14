import { requestJson, safeHttps } from './http.mjs';

function normalizePost(post) {
  const image =
    post.media_type === 'IMAGE'
      ? post
      : post.children?.data?.find((child) => child.media_type === 'IMAGE');
  if (!image || !safeHttps(image.media_url) || !safeHttps(post.permalink, 'www.instagram.com'))
    return null;
  return {
    id: String(post.id),
    imageUrl: image.media_url,
    permalink: post.permalink,
    caption: String(post.caption || '').slice(0, 1000),
    publishedAt: post.timestamp,
  };
}
export async function instagramFeed(env) {
  if (!/^\d+$/.test(env.INSTAGRAM_USER_ID || '')) throw new Error('Instagram user ID required');
  if (!/^v\d+\.\d+$/.test(env.INSTAGRAM_API_VERSION || ''))
    throw new Error('Instagram API version required');
  const url = new URL(
    `https://graph.instagram.com/${env.INSTAGRAM_API_VERSION}/${env.INSTAGRAM_USER_ID}/media`,
  );
  url.search = new URLSearchParams({
    limit: '24',
    fields: 'id,caption,media_type,media_url,permalink,timestamp,children{media_type,media_url}',
  }).toString();
  const data = await requestJson(url, {
    headers: { Authorization: `Bearer ${env.INSTAGRAM_ACCESS_TOKEN}` },
  });
  if (!Array.isArray(data.data)) throw new Error('Invalid Instagram response');
  return {
    fetchedAt: new Date().toISOString(),
    source: 'instagram',
    items: data.data.map(normalizePost).filter(Boolean).slice(0, 12),
  };
}
