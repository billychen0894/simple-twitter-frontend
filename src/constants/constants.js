export const tweetsList = [
  {
    tweetId: 't1',
    userId: 'u1',
    content: 'This is the first tweet I have ever posted',
    commentCount: 55,
    likeCount: 100,
    repliers: ['u2', 'u3'],
    createdAt: '6月23日',
  },
  {
    tweetId: 't2',
    userId: 'u2',
    content:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    commentCount: 45,
    likeCount: 100,
    repliers: ['u1', 'u3'],
    createdAt: '6月23日',
  },
  {
    tweetId: 't3',
    userId: 'u3',
    content:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    commentCount: 35,
    likeCount: 50,
    repliers: ['u2', 'u3'],
    createdAt: '6月23日',
  },
  {
    tweetId: 't4',
    userId: 'u4',
    content:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    commentCount: 35,
    likeCount: 50,
    repliers: ['u2', 'u3', 'u1'],
    createdAt: '6月23日',
  },
];

export const usersList = [
  {
    userId: 'u1',
    name: 'John Doe',
    userName: 'johndoe',
    profileStatus:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    profileHeaderImage:
      'https://images.unsplash.com/photo-1673632156153-d3baf0d0401b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    image: '',
    following: ['u2', 'u3'],
    followers: ['u2', 'u3', 'u4'],
  },
  {
    userId: 'u2',
    name: 'user2',
    userName: 'user2',
    profileStatus:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    profileHeaderImage: '',
    image: '',
    following: ['u1', 'u3', 'u4'],
    followers: ['u1'],
  },
  {
    userId: 'u3',
    name: 'user3',
    userName: 'user3',
    profileStatus:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    profileHeaderImage: '',
    image: '',
    following: ['u1', 'u4'],
    followers: ['u1', 'u2', 'u4'],
  },
  {
    userId: 'u4',
    name: 'user4',
    userName: 'user4',
    profileStatus:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    profileHeaderImage: '',
    image: '',
    following: ['u1', 'u3'],
    followers: ['u2', 'u3'],
  },
];

export const replyList = [
  {
    replyId: 'r1',
    userId: 'u2',
    tweetId: 't1',
    replyContent: 'nothing is good',
    createdAt: '6月10日',
  },
  {
    replyId: 'r2',
    userId: 'u3',
    tweetId: 't1',
    replyContent:
      'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    createdAt: '6月10日',
  },
];
