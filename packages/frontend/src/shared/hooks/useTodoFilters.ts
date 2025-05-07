import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseBoolean } from '~/helpers/parseBoolean';
import type { TodoSearchParams } from '~shared/interfaces/todo.interface';
import { SEARCH_STRING_KEYS } from '~shared/keys';

interface UseTodoFiltersType extends TodoSearchParams {
  setFilters: (filters: TodoSearchParams) => void;
}

export function useTodoFilters(): UseTodoFiltersType {
  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get(
    SEARCH_STRING_KEYS.SEARCH,
  ) as TodoSearchParams['title'];

  const status = searchParams.get(SEARCH_STRING_KEYS.STATUS)
    ? parseBoolean(searchParams.get(SEARCH_STRING_KEYS.STATUS))
    : undefined;

  const isPublic = searchParams.get(SEARCH_STRING_KEYS.IS_PUBLIC)
    ? parseBoolean(searchParams.get(SEARCH_STRING_KEYS.IS_PUBLIC))
    : undefined;

  const page = searchParams.get(SEARCH_STRING_KEYS.PAGE)
    ? parseInt(searchParams.get(SEARCH_STRING_KEYS.PAGE))
    : 1;

  const take = searchParams.get(SEARCH_STRING_KEYS.TAKE)
    ? parseInt(searchParams.get(SEARCH_STRING_KEYS.TAKE))
    : 4;

  const setFilters = useCallback(
    (filters: TodoSearchParams) => {
      setSearchParams((params) => {
        if (filters.title !== undefined) {
          params.set(SEARCH_STRING_KEYS.SEARCH, filters.title);
        }

        if (filters.status !== undefined) {
          params.set(SEARCH_STRING_KEYS.STATUS, String(filters.status));
        }

        if (filters.isPublic !== undefined) {
          params.set(SEARCH_STRING_KEYS.IS_PUBLIC, String(filters.isPublic));
        }

        if (filters.page) {
          params.set(SEARCH_STRING_KEYS.PAGE, String(filters.page));
        }

        if (filters.take) {
          params.set(SEARCH_STRING_KEYS.TAKE, String(filters.take));
        }

        return params;
      });
    },
    [status],
  );

  return {
    title,
    status,
    isPublic,
    page,
    take,
    setFilters,
  };
}
