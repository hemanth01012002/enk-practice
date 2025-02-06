import axios from "axios";


const api = axios.create({
    baseURL: "https://67a069ed24322f8329c61a32.mockapi.io/api/movie"
});


// export const post = () =>{   
//     return api.post("/posts");
// };


export const get = () =>{
    return api.get("/movies");
};

// export const deleted = (id) =>{
//     return api.delete(`/posts/${id}`)
// }

// export const putt = (currentPost) => {
//     return api.put(`/posts/${currentPost.id}`, {
//       title: currentPost.title,
//       body: currentPost.body,
//     });
//   };