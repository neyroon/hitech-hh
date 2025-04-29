import QueryString from "qs";

export async function fetchFromServer(
  url: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    const queryString = QueryString.stringify(urlParamsObject);
    const requestUrl = `${url}?${queryString}`;
    const response = await fetch(requestUrl, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}
