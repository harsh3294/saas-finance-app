"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";
import { Row } from "@tanstack/react-table";

export type deleteAccountType = Row<{
  id: string;
  name: string;
}>;

const AccountsPage = () => {
  const { onOpen } = useNewAccount();

  const accountsQuery = useGetAccounts();

  const deleteAccounts = useBulkDeleteAccounts();

  const accountsData = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = (row: deleteAccountType[]) => {
    const ids = row.map((r) => r.original.id);

    deleteAccounts.mutate({ ids });
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4" />
            <span className="ml-1">Add New</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accountsData}
            filterKey="name"
            onDelete={(row) => {
              handleDelete(row);
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
