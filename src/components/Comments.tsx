import { WEB_SITE } from "config";

export default async function Comments({postSlug}: {postSlug: string}) {

  let comments = [];

    try {
        const commentsRes = await fetch(`${WEB_SITE}/api/comments/${postSlug}` , {next: {revalidate: 5}})
        const response = await commentsRes.json()
        comments = response.comments.rows
        console.log(comments)
    } catch (error) {
        console.log(error)
    }
  
  return (
    <div>
      <h2>Comments</h2>
      <h3>Leave a comment: </h3>

      <form className="[&>input]:text-black [&>textarea]:text-black " action={`/api/comments/${postSlug}`} method='POST'>
        <label htmlFor="username">Name:</label>
        <input type="text" name="username"></input>

        <label htmlFor="comment">Your comment</label>
        <textarea name="comment" cols={30} rows={10}></textarea>

        <button type="submit">send comment</button>
      </form>

      {/* @ts-ignore */}
      {comments.map((comment) => {
          return (
              <li key={comment.id}>
                  {comment.username} says..
                  <br/>
                  {comment.content}
              </li>
          )
      })}
    </div>
  )

}

