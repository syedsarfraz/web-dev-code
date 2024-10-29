type Normalize<Obj extends object> = [{ [key in keyof Obj]: Obj[key] }][0];
type WithId<Data extends object> = Normalize<Data & { id: string }>;
type WithoutId<Data extends object> = Normalize<Omit<Data, 'id'>>;

export type ExtractFromQuery<T extends Query<object>> = T extends Query<
  infer Data
>
  ? WithId<Data>
  : never;

type ExtractFields<Obj extends object, Type> = keyof Obj extends infer K
  ? K extends string
    ? K
    : never
  : never;

// typescript issue with deep nested data
// type WithTypeField<Obj extends object, Type, P extends string = ''> = {
//   [K in Extract<keyof Obj, string>]: Obj[K] extends Type
//     ? `${P}${K}`
//     : Obj[K] extends object
//     ? WithTypeField<Obj[K], Type, `${P}${K}.`>
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

  embed<
    Obj extends Record<string, object | object[]>,
    K extends keyof Obj = keyof Obj
  >(...collections: K[]) {
    for (const collection of collections) {
      this.query.append('_embed', collection as string);
    }
    // return this as Query<Normalize<Data & Obj>>; // step 1
    // return this as Query<Normalize<Data & {[K in keyof Obj]: Obj[K]}>>; // step 2
    // return this as Query<Normalize<Data & {[K in keyof Obj]: WithId<Obj[K]>}>>; // step 3
    return this as Query<
      Normalize<
        Data & {
          [K in keyof Obj]: Obj[K] extends object[]
            ? WithId<Obj[K][number]>[]
            : WithId<Obj[K]>;
        }
      >
    >;
  }

  eq<NField extends ExtractFields<Data, string | number> | (string & {})>(
    field: NField,
    value: string
  ) {
    this.query.append(field as string, value);
    return this;
  }

  ne<NField extends ExtractFields<Data, string | number> | (string & {})>(
    field: NField,
    value: string
  ) {
    this.query.append(`${field as string}_ne`, value);
    return this;
  }

  gt<NField extends ExtractFields<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}_gt`, String(value));
    return this;
  }
  gte<NField extends ExtractFields<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}_gte`, String(value));
    return this;
  }
  lt<NField extends ExtractFields<Data, number> | (string & {})>(
    field: NField,
    value: number
  ) {
    this.query.append(`${field as string}lt`, String(value));
    return this;
  }
  lte<NField extends ExtractFields<Data, number> | (string & {})>(
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
    NField extends ExtractFields<Data, string | number>,
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
