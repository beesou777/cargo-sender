export async function getPaginationData(currentPage: number, pageSize: number, total: number) {
  const totalPages = Math.ceil(total / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return { start, end, totalPages };
}
