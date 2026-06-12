import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/github";

export const GithubHeader = async () => {
  let stars: number | "notAvailable" = "notAvailable";

  try {
    const res = await fetch(siteConfig.githubApiUrl, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = (await res.json()) as { stargazers_count: number };
      stars = data.stargazers_count;
    }
  } catch {
    stars = "notAvailable";
  }

  return (
    <Button variant="outline" asChild size="sm">
      <Link
        href={siteConfig.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2"
      >
        <GithubIcon className={cn("size-4 shrink-0")} size={16} />
        {stars !== "notAvailable" && (
          <Badge variant="secondary" className="font-normal">
            {stars.toLocaleString()} ⭐
          </Badge>
        )}
        <span className="sr-only">GitHub</span>
      </Link>
    </Button>
  );
};
