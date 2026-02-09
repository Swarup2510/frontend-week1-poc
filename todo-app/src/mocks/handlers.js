import { http, HttpResponse } from 'msw';

// In-memory storage for posts
let postsStore = [
  {
    userId: 1,
    id: 1,
    title: 'First Post',
    body: 'This is the first post from the mock backend.'
  },
  {
    userId: 1,
    id: 2,
    title: 'Second Post',
    body: 'This is the second post from the mock backend.'
  },
  {
    userId: 2,
    id: 3,
    title: 'Third Post',
    body: 'Another post from a different user.'
  }
];

let nextPostId = 4;

// Sample users data
const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874'
    },
    phone: '1-770-736-8031'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '50226'
    },
    phone: '010-692-6593'
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: {
      street: 'Douglas Extension',
      suite: 'Suite 847',
      city: 'McKenziehaven',
      zipcode: '59590-4725'
    },
    phone: '1-463-123-4447'
  }
];

export const handlers = [
  // GET /users
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  // GET /posts
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json(postsStore);
  }),

  // POST /posts
  http.post('https://jsonplaceholder.typicode.com/posts', async ({ request }) => {
    const body = await request.json();
    
    const newPost = {
      userId: body.userId || 1,
      id: nextPostId++,
      title: body.title,
      body: body.body
    };

    postsStore.push(newPost);

    return HttpResponse.json(newPost, { status: 201 });
  })
];
