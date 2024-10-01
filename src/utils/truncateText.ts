export default function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncatedText = text.slice(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');

  if (lastSpaceIndex !== -1) {
    return truncatedText.slice(0, lastSpaceIndex) + ' ...';
  } else {
    return truncatedText + ' ...';
  }
}
