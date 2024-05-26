"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/data-table";

const data: Payment[] = [
  {
    id: "z3jstibp",
    amount: 382,
    status: "completed",
    email: "user14@example.com",
  },
  {
    id: "ad7qcsav",
    amount: 640,
    status: "pending",
    email: "user676@example.com",
  },
  {
    id: "g8eodspf",
    amount: 258,
    status: "failed",
    email: "user165@example.com",
  },
  {
    id: "ioisdu4h",
    amount: 689,
    status: "completed",
    email: "user346@example.com",
  },
  {
    id: "1e8lmh1k",
    amount: 73,
    status: "completed",
    email: "user736@example.com",
  },
  {
    id: "8bpwtuav",
    amount: 222,
    status: "failed",
    email: "user437@example.com",
  },
  {
    id: "jpznk72i",
    amount: 57,
    status: "completed",
    email: "user848@example.com",
  },
  {
    id: "ffweeabv",
    amount: 619,
    status: "completed",
    email: "user454@example.com",
  },
  {
    id: "rbvsdgho",
    amount: 208,
    status: "failed",
    email: "user623@example.com",
  },
  {
    id: "mm2qfeq7",
    amount: 426,
    status: "pending",
    email: "user417@example.com",
  },
  {
    id: "dcj2nc8w",
    amount: 495,
    status: "completed",
    email: "user234@example.com",
  },
  {
    id: "mlzjd0zw",
    amount: 786,
    status: "failed",
    email: "user783@example.com",
  },
  {
    id: "pysq6kpz",
    amount: 309,
    status: "pending",
    email: "user344@example.com",
  },
  {
    id: "jvs83vjw",
    amount: 956,
    status: "pending",
    email: "user212@example.com",
  },
  {
    id: "a3lmw7qw",
    amount: 483,
    status: "failed",
    email: "user853@example.com",
  },
  { id: "u92kjlo8", amount: 67, status: "failed", email: "user16@example.com" },
  {
    id: "dg4vqb5n",
    amount: 854,
    status: "completed",
    email: "user742@example.com",
  },
  {
    id: "t5llawq4",
    amount: 430,
    status: "failed",
    email: "user95@example.com",
  },
  {
    id: "x0iaa92w",
    amount: 11,
    status: "pending",
    email: "user362@example.com",
  },
  {
    id: "cxk7xv36",
    amount: 743,
    status: "completed",
    email: "user537@example.com",
  },
];

const AccountsPage = () => {
  const { onOpen } = useNewAccount();

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
            data={data}
            filterKey="email"
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
