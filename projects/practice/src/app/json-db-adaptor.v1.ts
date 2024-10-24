type Normalize<Obj extends object> = [{ [key in keyof Obj]: Obj[key] }][0];
type WithId<Data extends object> = Normalize<Data & { id: string }>;
type WithoutId<Data extends object> = Normalize<Omit<Data, 'id'>>;

class NetworkError extends Error {
  constructor(error: unknown) {
    super('Network Error');
    this.cause = error;
  }
}

class ResponseError extends Error {
  constructor(public res: Response) {
    super('Response Error');
  }
}

class Collection<Data extends object> {
  constructor(private url: string) {}
  async query() {
    const res = await fetch(this.url).catch((e) => {
      throw new NetworkError(e);
    });
    if (!res.ok) throw new ResponseError(res);
    return (await res.json()) as WithId<Data>[];
  }

  async get(id: string) {
    const res = await fetch(`${this.url}/${id}`).catch((e) => {
      throw new NetworkError(e);
    });
    if (!res.ok) throw new ResponseError(res);
    return (await res.json()) as WithId<Data>;
  }

  async create(data: WithoutId<Data>) {
    const res = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
    }).catch((e) => {
      throw new NetworkError(e);
    });
    if (!res.ok) throw new ResponseError(res);
    return (await res.json()) as WithId<Data>;
  }

  async update(id: string, data: WithoutId<Data>) {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).catch((e) => {
      throw new NetworkError(e);
    });
    if (!res.ok) throw new ResponseError(res);
    return (await res.json()) as WithId<Data>;
  }

  async updatePartial(id: string, data: Partial<WithoutId<Data>>) {
    const res = await fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }).catch((e) => {
      throw new NetworkError(e);
    });
    if (!res.ok) throw new ResponseError(res);
    return (await res.json()) as WithId<Data>;
  }

  async remove(id: string) {
    const res = await fetch(`${this.url}/${id}`, { method: 'DELETE' }).catch(
      (e) => {
        throw new NetworkError(e);
      }
    );
    if (!res.ok) throw new ResponseError(res);
    return (await res.json()) as WithId<Data>;
  }
}

class JsonDB {
  constructor(private baseUri: string) {}
  collection<Data extends object = object>(name: string) {
    return new Collection<Data>(`${this.baseUri}/${name}`);
  }
}

interface Post {
  name: string;
}

interface PostComment {
  message: string;
  postId: string;
}

const test = async () => {
  const db = new JsonDB('http://localhost:3000');
  const posts = db.collection<Post>('posts');
  const comments = db.collection<PostComment>('comments');

  const post1 = await posts.create({ name: 'Post 3' });

  await comments.create({ message: 'Msg 1', postId: post1.id });
  await comments.create({ message: 'Msg 2', postId: post1.id });
  await comments.create({ message: 'Msg 3', postId: post1.id });

  const postAll = await posts.query();
  const commentAll = await comments.query();
  console.log(postAll);
  console.log(commentAll);
};

// test();
