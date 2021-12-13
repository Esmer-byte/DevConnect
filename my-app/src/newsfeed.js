function NewsFeed() {
    Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3000/getPosts",
      }).then((res));

    return (<div></div>)
}
export default NewsFeed;