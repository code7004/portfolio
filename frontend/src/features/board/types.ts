// features/board/types.ts
export interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface BoardSearchParams {
  keyword?: string;
  page: number;
  size: number;
  sort?: "latest" | "view";
}
