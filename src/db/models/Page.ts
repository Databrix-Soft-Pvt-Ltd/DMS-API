class Page {
  limit: number;
  page: number;
  totalCount: number;

  constructor(pagination: { limit: number; page: number; totalCount?: number }) {
    this.limit = pagination.limit;
    this.page = pagination.page;
    this.totalCount = pagination.totalCount || 0;
  }
}

export default Page;
