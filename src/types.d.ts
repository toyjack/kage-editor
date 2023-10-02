export type AppProps = {
  host?: string;
  lang?: "ja" | "en" | "ko" | "zh-Hans" | "zh-Hant";
  name?: string;
  related?: string;
  data?: string;
  onSubmit?: (data: string) => void;
};
