import { useParams } from "react-router-dom";
import PostForm from "../components/post-form"

function EditOwnPost() {
   const { id } = useParams(); // az "id" a route-ban megadott névvel egyezik
  const postIdUrl = Number(id)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saját profil szerkesztése</h1>
      <p className="text-gray-600 mb-6">Itt tudod szerkeszteni a profilodat.</p>
      <PostForm page="edit" postId={postIdUrl} />
    </div>
  )
}

export default EditOwnPost