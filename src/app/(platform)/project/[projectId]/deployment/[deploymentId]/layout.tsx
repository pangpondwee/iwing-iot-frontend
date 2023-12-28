import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { MainContainer } from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDetails, TProjectDetails } from "@/lib/type";

const tabs = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Map", href: "map" },
  { label: "Devices", href: "devices" },
  { label: "API settings", href: "api-settings" },
];

type LayoutProps = {
  params: { projectId: string; deploymentId: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  // console.log("params", params);
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: deploymentData }: { data: TDeploymentDetails } =
    await fetchData(`/phase/${params.deploymentId}`);
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/project/${params.projectId}/deployments`}>
              {projectData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>{deploymentData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{deploymentData.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="deployment" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
