import { zodResolver } from "@hookform/resolvers/zod";
import { useEditOwnPost } from "../logic/usePosts";
import { EditPostSchema } from "../schemas/postSchema";
import { useForm } from "react-hook-form";
import CustomButton from "./custom-button";
type PostFormProps = {
  page: "create" | "edit";
  postId?: number;
};
function PostForm({ page, postId }: PostFormProps) {
  const { mutate: editOwnPost, isPending,isSuccess:isSuccesEdit } = useEditOwnPost();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(EditPostSchema),
  });
  const onSubmit = (data: { title: string; content: string }) => {
    if (page === "edit" && postId) {
      editOwnPost({ postId, ...data });
    } else {
      null
    }
  };
  return (
    <form className="flex flex-col gap-4 p-4 min-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <input type="text"
        {...register("title")}
        placeholder="title..."
        disabled={isPending}
        className="border-2 border-amber-700 h-12 rounded-lg px-2"
      />
      {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      <textarea
        {...register("content")}
        placeholder="content..."
        disabled={isPending}
        className="border-2 border-amber-700 h-24 rounded-lg px-2" />
      {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
      <CustomButton
        ispending={isPending}
        type="submit"
        variant="secondary"
        className="cursor-pointer"
      >
        {isPending ? "Küldés..." : "Beküldés"}
      </CustomButton>
      {isSuccesEdit && <span className="text-sm p-5 bg-green-300">Sikeres szerkesztés!</span>}
    </form>
  )
}

export default PostForm