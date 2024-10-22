type Normalize<Obj extends object> = [{ [key in keyof Obj]: Obj[key] }][0];
type WithId<Data extends object> = Normalize<Data & { id: string }>;
type WithoutId<Data extends object> = Normalize<Omit<Data, 'id'>>;

export class NetworkError extends Error {
  constructor(error: unknown) {
    super('Network Error');
    this.cause = error;
  }
}

export class ResponseError extends Error {
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

export class JsonDB {
  constructor(private baseUri: string) {}
  collection<Data extends object = object>(name: string) {
    return new Collection<Data>(`${this.baseUri}/${name}`);
  }
}

interface Post {
  name: string;
}

(async () => {
  const db = new JsonDB('http://localhost:3000');
  const posts = db.collection<Post>('post');

  const post1 = await posts.create({ name: '' });
  const postAll = await posts.query();
})();
