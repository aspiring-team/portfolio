export const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string
) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });
};
