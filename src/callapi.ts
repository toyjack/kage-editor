const apiUrlPrefix = localStorage.getItem("kage-editor-host")
  ? (localStorage.getItem("kage-editor-host") as string)
  : "https://asia-northeast1-ku6goma.cloudfunctions.net/gwproxy";

const callApi = async (path: string) => {
  const response = await fetch(apiUrlPrefix + path);
  if (!response.ok) {
    throw new Error("API error occurred");
  }
  return new URLSearchParams(await response.text());
};

export const getSource = async (name: string) => {
  const result = await callApi(
    `/get_source.cgi?name=${encodeURIComponent(name)}`
  );
  return result.get("data");
};

export const search = async (query: string) => {
  const result = await callApi(
    `/search4ge.cgi?query=${encodeURIComponent(query)}`
  );
  return result.get("data")!;
};

export const getCandidate = async (name: string) => {
  const result = await callApi(
    `/get_candidate.cgi?name=${encodeURIComponent(name)}`
  );
  return result.get("data")!;
};
