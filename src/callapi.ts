import store from "./store";

let apiUrlPrefix:string="http://localhost:3000/api";

if (store) {
  apiUrlPrefix = store.getState().args.host;
  const listener = () => {
    apiUrlPrefix = store.getState().args.host;
  }
  store.subscribe(listener);
}
// const listener = () => {
//   apiUrlPrefix = store.getState().args.host;
// }
// console.log(store)
// store.subscribe(listener);

// apiUrlPrefix = store? store.getState().args.host : "http://localhost:3000/api";
// const apiUrlPrefix = "http://localhost:3000/api";

const callApi = async (path: string) => {
  const response = await fetch(apiUrlPrefix + path);
  if (!response.ok) {
    throw new Error('API error occurred');
  }
  return new URLSearchParams(await response.text());
};

export const getSource = async (name: string) => {
  const result = await callApi(`/get_source.cgi?name=${encodeURIComponent(name)}`);
  return result.get('data');
};

export const search = async (query: string) => {
  const result = await callApi(`/search4ge.cgi?query=${encodeURIComponent(query)}`);
  return result.get('data')!;
};

export const getCandidate = async (name: string) => {
  const result = await callApi(`/get_candidate.cgi?name=${encodeURIComponent(name)}`);
  return result.get('data')!;
};
