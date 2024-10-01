export default function findIdInSlug(slug: string) {
  const lastIndex = slug.lastIndexOf('-');
  if (lastIndex !== -1) {
    return slug.substring(lastIndex + 1);
  }
  return null;
}
