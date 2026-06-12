import { GithubHeader } from "./github";
import { SiteHeaderInner } from "./site-header-inner";

export const SiteHeader = () => (
  <SiteHeaderInner githubSlot={<GithubHeader />} />
);
