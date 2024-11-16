export function getQueryParams(req: Request): { [key: string]: string } {
  const url = req.url;
  const params: { [key: string]: string } = {};
  try {
    const urlObj = new URL(url);
    const queryParams = new URLSearchParams(urlObj.search);

    queryParams.forEach((value, key) => {
      params[key] = value;
    });
  } catch (error) {
    console.error("Invalid URL:", error);
  }

  return params;
}
