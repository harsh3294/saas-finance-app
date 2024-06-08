import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

interface ErrorResponse {
  error: string;
}

type ResponseType = InferResponseType<typeof client.api.categories.$post>;

type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({ json });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.error || "An unknown error occurred");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category created.");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create a category.");
    },
  });
  return mutation;
};
