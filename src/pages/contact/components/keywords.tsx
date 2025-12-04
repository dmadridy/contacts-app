import type { Keyword } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function Keywords({
  keywords,
}: {
  keywords: Keyword[] | undefined;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {keywords?.map((keyword) => (
          <Button key={keyword.value} variant="outline">
            {keyword.label}
          </Button>
        ))}
        {keywords?.length === 0 && <p>No keywords found</p>}
      </div>
    </div>
  );
}
