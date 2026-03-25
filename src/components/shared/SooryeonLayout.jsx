import { Badge } from "@/components/ui/badge";

export function SooryeonLayout({ title, badges, description, children }) {
  return (
    <div className="container mx-auto max-w-5xl space-y-8 pt-8 pb-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <div className="flex gap-2 flex-wrap">
            {badges &&
              badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
          </div>
        </div>
        <div className="text-lg text-muted-foreground max-w-3xl">{description}</div>
      </div>
      {children}
    </div>
  );
}
