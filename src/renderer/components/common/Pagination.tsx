import classNames from 'classnames';
import { Link, createSearchParams } from 'react-router-dom';
import { QueryConfig } from '../../hooks/useQueryConfig';
import path from '../../constants/path';

interface Props {
  queryConfig: QueryConfig;
  pageSize: number;
}
const RANGE = 2; // Khoảng cách trang liền kề
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE) {
          return renderDotAfter(index);
        } else if (
          page > RANGE * 2 + 1 &&
          page < pageSize - RANGE * 2 &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        return (
          <Link
            to={{
              pathname: path.products,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              'mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page,
              },
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };

  return (
    <div className="py-6 flex flex-wrap justify-end items-center">
      {page === 1 ? (
        <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm">
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: path.products,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm">
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: path.products,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
        >
          Next
        </Link>
      )}
    </div>
  );
}
