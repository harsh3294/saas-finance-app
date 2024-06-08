"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Row } from "@tanstack/react-table";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete";

export type deleteCategoryType = Row<{
  id: string;
  name: string;
}>;

const CategoriesPage = () => {
  const { onOpen } = useNewCategory();

  const categoriesQuery = useGetCategories();

  const deleteCategories = useBulkDeleteCategories();

  const categoriesData = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
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

  const handleDelete = (row: deleteCategoryType[]) => {
    const ids = row.map((r) => r.original.id);

    deleteCategories.mutate({ ids });
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories Page
          </CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size-4" />
            <span className="ml-1">Add New</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categoriesData}
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

export default CategoriesPage;
