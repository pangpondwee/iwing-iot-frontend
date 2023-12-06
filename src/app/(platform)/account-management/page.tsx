import { DataTable } from "@/components/data-table/data-table";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  TUserAccount,
  userAccountColumns,
} from "@/components/columns/user-account-columns";
import { fetchData } from "@/lib/data-fetching";
import { UserAccountForm } from "@/components/forms/user-account-form";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";

export default async function AccountManagement() {
  const { data }: { data: TUserAccount[] } = await fetchData("/admin/account");
  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Account Management</HeaderTitle>
            <HeaderDescription>
              View and manage all account in this platform.
            </HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <DialogWithContent
              content={<UserAccountForm submitLabel="Create" />}
              title="Create new account"
            >
              <Button>
                <Plus className="mr-2 h-5 w-5" />
                New account
              </Button>
            </DialogWithContent>
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <TableWrapper>
          <DataTable columns={userAccountColumns} data={data} />
        </TableWrapper>
      </MainContainer>
    </>
  );
}
