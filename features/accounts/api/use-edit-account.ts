import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

interface ErrorResponse {
  error: string;
}

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;

type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        param: { id },
        json,
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.error || "An unknown error occurred");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["accounts", { id }],
      });

      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update an account.");
    },
  });
  return mutation;
};
