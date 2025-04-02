import type { NextApiRequest, NextApiResponse } from 'next';

const users = {
  "1": "John Doe",
  "2": "Jane Doe",
  "3": "Alice Smith",
  "4": "Bob Johnson",
  "5": "Charlie Brown",
  "6": "Diana White",
  "7": "Edward Davis",
  "8": "Fiona Miller",
  "9": "George Wilson",
  "10": "Helen Moore",
  "11": "Ivy Taylor",
  "12": "Jack Anderson",
  "13": "Kathy Thomas",
  "14": "Liam Jackson",
  "15": "Mona Harris",
  "16": "Nathan Clark",
  "17": "Olivia Lewis",
  "18": "Paul Walker",
  "19": "Quinn Scott",
  "20": "Rachel Young"
};

const postsCount = {
  "1": 10,
  "2": 5,
  "3": 15,
  "4": 7,
  "5": 12,
  "6": 8,
  "7": 4,
  "8": 9,
  "9": 6,
  "10": 11,
  "11": 3,
  "12": 2,
  "13": 5,
  "14": 7,
  "15": 13,
  "16": 8,
  "17": 9,
  "18": 4,
  "19": 6,
  "20": 10
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userList = Object.keys(users).map(id => ({
    id,
    name: users[id],
    posts: postsCount[id] || 0
  }));
  const topUsers = userList.sort((a, b) => b.posts - a.posts).slice(0, 5);
  res.status(200).json({ topUsers });
}
