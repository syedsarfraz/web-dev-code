type Normalize<Obj extends object> = [{ [key in keyof Obj]: Obj[key] }][0];
type WithId<Data extends object> = Normalize<Data & { id: string }>;
type WithoutId<Data extends object> = Normalize<Omit<Data, 'id'>>;

type WithTypeField<Obj extends object, Type, P extends string = ''> = {
  [K in Extract<keyof Obj, string>]: Obj[K] extends Type
    ? `${P}${K}`
    : // : Obj[K] extends any[]
    // ? WithTypeIndex<Obj[K], Type, `${P}${K}`>
    Obj[K] extends object
    ? WithTypeField<Obj[K], Type, `${P}${K}.`>
    : never;
}[Extract<keyof Obj, string>];

// Deep recursive error
// type WithTypeIndex<Obj extends any[], Type, P extends string = ''> = {
//   [I in Extract<keyof Obj, string>]: Obj[I] extends Type
//     ? `${P}[${I}]`
//     : Obj[I] extends any[]
//     ? WithTypeIndex<Obj[I], Type, `${P}[${I}]`>
//     : Obj[I] extends object
//     ? WithTypeField<Obj[I], Type, `${P}[${I}].`>
//     : never;
// }[Extract<keyof Obj, string>];

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

class Query<Data extends object> {
  constructor(protected url: string) {}

  private query = new URLSearchParams();

  embed<Obj extends Record<string, object>, K extends keyof Obj = keyof Obj>(
    ...collections: K[]
  ) {
    for (const collection of collections) {
      this.query.append('_embed', collection as string);
    }
    return this as Query<
      Normalize<Data & { [K in keyof Obj]: WithId<Obj[K]> }>
    >;
  }

  eq<NField extends WithTypeField<Data, string | number> | (string & {})>(
    field: NField,
    value: string
  ) {
    this.query.append(field as string, value);
    return this;
  }

  ne<NField extends WithTypeField<Data, string | number> | (string & {})>(
    field: NField,
    value: string
  ) {
    this.query.append(`${field as string}_ne`, value);
    return this;
  }

  gt<NField extends WithTypeField<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}_gt`, String(value));
    return this;
  }
  gte<NField extends WithTypeField<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}_gte`, String(value));
    return this;
  }
  lt<NField extends WithTypeField<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}lt`, String(value));
    return this;
  }
  lte<NField extends WithTypeField<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}lte`, String(value));
    return this;
  }

  range(start: number, end: number) {
    this.query.append('_start', String(start));
    this.query.append('_end', String(end));
    return this;
  }

  limit(start: number, limit: number) {
    this.query.append('_start', String(start));
    this.query.append('_limit', String(limit));
    return this;
  }

  paginate(page: number, perPage: number) {
    this.query.append('_page', String(page));
    this.query.append('_per_page', String(perPage));
    return this;
  }

  sort<
    NField extends WithTypeField<Data, string | number>,
    SortField extends NField | `-${NField}` | (string & {})
  >(field: SortField) {
    const prev = this.query.get('_sort') || '';
    this.query.set('_sort', [prev, field].filter(Boolean).join(','));
    return this;
  }

  exec() {
    return request<WithId<Data>[]>(`${this.url}?${this.query.toString()}`);
  }

  get(id: string) {
    return request<WithId<Data>>(`${this.url}/${id}?${this.query.toString()}`);
  }
}

class Collection<Data extends object> extends Query<Data> {
  constructor(url: string) {
    super(url);
  }

  create(data: WithoutId<Data>) {
    return request<WithId<Data>>(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  update(id: string, data: WithoutId<Data>) {
    return request<WithId<Data>>(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  updatePartial(id: string, data: Partial<WithoutId<Data>>) {
    return request<WithId<Data>>(`${this.url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  remove(id: string) {
    return request<WithId<Data>>(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }
}

async function request<T = object>(url: string, init?: RequestInit) {
  const res = await fetch(url, init).catch((e) => {
    throw new NetworkError(e);
  });
  if (!res.ok) throw new ResponseError(res);
  return (await res.json()) as T;
}

export class JsonDB {
  constructor(private baseUri: string) {}
  collection<Data extends object = object>(name: string) {
    return new Collection<Data>(`${this.baseUri}/${name}`);
  }
}

// testing

interface Post {
  name: string;
  views: number;
  status: 'publish' | 'draft';
}

interface PostComment {
  message: string;
  postId: string;
}

interface Tag {
  name: string;
  postId: string;
}

const test = async () => {
  // const db = new JsonDB('http://localhost:3000');
  // const posts = db.collection<Post>('post');

  // const post1 = await posts.create({ name: '', views: 0, status: 'draft' });
  // const postAll = await posts.exec();
  // const postAll2 = await posts
  //   .embed<{ comments: Comment[]; tags: Tag[] }>('comments', 'tags')
  //   .eq('status', 'publish')
  //   .gte('views', 100)
  //   .sort('-name')
  //   .sort('views')
  //   .exec()
  //   .catch((e) => {
  //     console.log({ e });
  //   });

  const db = new JsonDB('http://localhost:3000');
  const posts = db.collection<Post>('posts');
  const tags = db.collection<Tag>('tags');
  const comments = db.collection<PostComment>('comments');

  // const post1 = await posts.create({
  //   name: 'How iran will retaliate to the israel',
  //   status: 'publish',
  //   views: 0,
  // });

  // await tags.create({ name: 'news', postId: post1.id });
  // await tags.create({ name: 'iran', postId: post1.id });

  // await comments.create({ message: 'Msg 1', postId: post1.id });
  // await comments.create({ message: 'Msg 2', postId: post1.id });
  // await comments.create({ message: 'Msg 3', postId: post1.id });

  // const postAll = await posts.exec();
  // const tagsAll = await tags.exec();
  // const commentAll = await comments.exec();
  // console.log(postAll);
  // console.log(tagsAll);
  // console.log(commentAll);

  // await fetch('http://localhost:3000/tags?name=news')
  const tagSearch = 'iran';
  const newsTags = await tags.eq('name', tagSearch).exec();
  console.log(newsTags);
  for (const tag of newsTags) {
    const post = await posts
      .embed<{ tags: Tag; comments: PostComment }>('tags', 'comments')
      .get(tag.postId);
    console.log(JSON.stringify(post, null, 2));
  }
};

test();
