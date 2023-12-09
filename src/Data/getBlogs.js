export const getBlogs = async () => {
  const response = await fetch(
    `https://ijlsbd.com/qs-blog/wp-json/wp/v2/posts`
  );
  if (response.ok) {
    return response.json();
  }
};

export const getHomePageBlogs = async () => {
  const response = await fetch(
    `https://ijlsbd.com/qs-blog/wp-json/wp/v2/posts?per_page=6`
  );
  if (response.ok) {
    return response.json();
  }
};
