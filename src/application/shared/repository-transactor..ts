/**
 * Inherently, it is unclear whether a repository provides transactional functionality.
 * However, for this project we agree that the repository provides transactional functionality.
 */
export abstract class RepositoryTransactor {
  abstract handle<T>(
    manipulation: () => Promise<T>,
  ): ReturnType<typeof manipulation>;
}
