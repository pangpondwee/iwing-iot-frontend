"use client";

import NotFoundIllustration from "@/components/atoms/illustrations/not-found-illustration";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error() {
  return (
    <EmptyState>
      <EmptyStateImage>
        <NotFoundIllustration />
      </EmptyStateImage>
      <EmptyStateTextContent>
        <EmptyStateTitle>This project doesn't exist.</EmptyStateTitle>
        <EmptyStateDescription>
          Don't worry! Let's go back home.
        </EmptyStateDescription>
      </EmptyStateTextContent>
      <EmptyStateAction>
        <Button asChild>
          <Link href="/home?sortBy=ascending">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back home
          </Link>
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}