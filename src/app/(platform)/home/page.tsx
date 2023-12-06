import { Search } from "@/components/atoms/search";
import { redirect } from "next/navigation";
import { fetchProject } from "@/lib/data-fetching";
import { TProject } from "@/lib/type";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitleAndSupporting,
  HeaderTitle,
} from "@/components/molecules/header";
import { getServerAuthSession } from "@/lib/auth";
import { CardGrid } from "@/components/templates/card-grid";
import { NotFoundIllustration } from "@/components/atoms/illustrations/not-found-illustration";
import { ProjectIllustration } from "@/components/atoms/illustrations/project-illustration";
import { SortDropDown } from "@/components/molecules/dropdowns/project-sort-dropdown";
import { ProjectAndDeploymentCard } from "@/components/molecules/project-and-deployment-card";
import { MainContainer } from "@/components/templates/main-container";

type HomeProps = {
  searchParams?: {
    searchQuery?: string;
    sortBy?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const searchQuery = searchParams?.searchQuery || "";
  const sortBy = searchParams?.sortBy || "";

  if (!sortBy) {
    redirect("/home?sortBy=ascending");
  }

  const { data }: { data: TProject[] } = await fetchProject(
    searchQuery,
    sortBy,
  );

  const session = await getServerAuthSession();

  const renderProject = () => {
    if (data.length === 0 && !searchQuery) {
      return (
        <EmptyState>
          <EmptyStateImage>
            <ProjectIllustration />
          </EmptyStateImage>
          <EmptyStateTextContent>
            <EmptyStateTitle>No projects yet?</EmptyStateTitle>
            <EmptyStateDescription>
              Start by creating your first one now!
            </EmptyStateDescription>
          </EmptyStateTextContent>
          <EmptyStateAction>
            <Button asChild>
              <Link href="/project/new">
                <Plus className="mr-1.5 h-5 w-5" />
                New project
              </Link>
            </Button>
          </EmptyStateAction>
        </EmptyState>
      );
    } else {
      return (
        <>
          <div className="flex justify-between gap-3">
            <Search
              className="sm:w-[400px]"
              placeholder="Search by project name"
            />
            <SortDropDown />
          </div>
          {data.length !== 0 ? (
            <CardGrid>
              {data.map((project: TProject) => (
                <ProjectAndDeploymentCard
                  key={project.id}
                  href={`/project/${project.id}/deployments`}
                  title={project.name}
                  owner={project.owner}
                  location={project.location.en_name}
                  startedAt={project.startedAt}
                />
              ))}
            </CardGrid>
          ) : (
            <EmptyState>
              <EmptyStateImage>
                <NotFoundIllustration />
              </EmptyStateImage>
              <EmptyStateTextContent>
                <EmptyStateTitle>No projects found.</EmptyStateTitle>
                <EmptyStateDescription>
                  Your search did not match any project.
                </EmptyStateDescription>
              </EmptyStateTextContent>
            </EmptyState>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Welcome back, {session?.user.name} 👋</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button asChild>
              <Link href="/project/new">
                <Plus className="mr-1.5 h-5 w-5" />
                New project
              </Link>
            </Button>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>{renderProject()}</MainContainer>
    </>
  );
}
