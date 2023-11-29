import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, User } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  id?: string;
  title?: string;
  owner?: string;
  location?: string;
  startedAt?: string;
  loading?: boolean;
};

export default function ProjectCard({
  id,
  title,
  owner,
  location,
  startedAt,
  loading,
}: ProjectCardProps) {
  if (loading)
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-40 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-muted-foreground">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-60 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-60 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-60 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  else {
    return (
      <Link href={`project/${id}`}>
        <Card>
          <CardHeader>
            <CardTitle className="truncate text-xl hover:underline">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 text-muted-foreground">
              <div className="flex gap-2">
                <User />
                <span>{owner}</span>
              </div>
              <div className="flex gap-2">
                <MapPin />
                <span>{location}</span>
              </div>
              <div className="flex gap-2">
                <Calendar />
                <span>{startedAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }
}
