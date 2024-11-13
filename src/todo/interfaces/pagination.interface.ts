export interface PaginationResponse<T> {
    items: T[],
    metadata: {
        totalItems: number,
        itemsPerPage: number,
        currentPage: number,
        totalPages: number,
        hasNextPage: Boolean,
        hasPreviousPage: Boolean
    }
}