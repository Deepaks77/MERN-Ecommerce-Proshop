import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const calculatePrev = page - 1 !== 0 ? page - 1 : 1;
  const calculateNext = page + 1 <= pages ? page + 1 : pages;
  const calculatePrevPathForHomeScreenProducts = keyword
    ? `/search/${keyword}/page/${calculatePrev}`
    : `/page/${calculatePrev}`;
  const calculatePrevPathForAdminProductList = `/admin/productlist/${calculatePrev}`;
  const calculateNextPathForHomeScreenProducts = keyword
    ? `/search/${keyword}/page/${calculateNext}`
    : `/page/${calculateNext}`;
  const calculateNextPathForAdminProductList = `/admin/productlist/${calculateNext}`;
  return (
    pages > 1 && (
      <Pagination className="d-flex justify-content-center">
        <LinkContainer
          to={
            !isAdmin
              ? calculatePrevPathForHomeScreenProducts
              : calculatePrevPathForAdminProductList
          }
        >
          <Pagination.Prev disabled={page === 1} />
        </LinkContainer>

        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}

        <LinkContainer
          to={
            !isAdmin
              ? calculateNextPathForHomeScreenProducts
              : calculateNextPathForAdminProductList
          }
        >
          <Pagination.Next disabled={page === pages} />
        </LinkContainer>
      </Pagination>
    )
  );
};

export default Paginate;
