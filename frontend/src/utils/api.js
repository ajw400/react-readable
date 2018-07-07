const api = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const newPost = (post) =>
  fetch(`${api}/posts`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(post)
  })

export const newComment = (comment) =>
  fetch(`${api}/comments`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(comment)
  })

export const vote = (type, id, option) =>
  fetch(`${api}/${type}/${id}`, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(option)
  })

  export const editPost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(post)
    })

  export const editComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(comment)
    })

  export const remove = (type, id) =>
    fetch(`${api}/${type}/${id}`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })



// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books)

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query })
//   }).then(res => res.json())
//     .then(data => data.books)
