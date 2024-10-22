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

  embed<Obj extends Record<string, unknown>, K extends keyof Obj = keyof Obj>(
    ...collections: K[]
  ) {
    for (const collection of collections) {
      this.query.append('_embed', collection as string);
    }
    return this as Query<Normalize<Data & Obj>>;
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
  >(...field: SortField[]) {
    this.query.append('_sort', field.join(','));
    return this;
  }

  exec() {
    return request<WithId<Data>[]>(`${this.url}?${this.query.toString()}`);
  }
}

class Collection<Data extends object> extends Query<Data> {
  constructor(url: string) {
    super(url);
  }

  async get(id: string) {
    return request<WithId<Data>>(`${this.url}/${id}`);
  }

  async create(data: WithoutId<Data>) {
    return request<WithId<Data>>(this.url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(id: string, data: WithoutId<Data>) {
    return request<WithId<Data>>(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updatePartial(id: string, data: Partial<WithoutId<Data>>) {
    return request<WithId<Data>>(`${this.url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async remove(id: string) {
    return request<WithId<Data>>(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }
}

async function request<T = object>(
  url: string,
  init?: Parameters<typeof fetch>[1]
) {
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

interface Comment {
  text: string;
  postId: string;
}

interface Tag {
  name: string;
  postId: string;
}

const test = async () => {
  const db = new JsonDB('http://localhost:3000');
  const posts = db.collection<Post>('post');

  const post1 = await posts.create({ name: '', views: 0, status: 'draft' });
  const postAll = await posts.exec();
  const postAll2 = await posts
    .embed<{ comments: Comment[]; tags: Tag[] }>('comments', 'tags')
    .eq('status', 'publish')
    .gte('views', 100)
    .exec();
};

// test()
