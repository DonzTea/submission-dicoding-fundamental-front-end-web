export const setActivePage = (page = "home") => {
  const root = document.querySelector("root-component");
  root.setAttribute("active-page", page);
};

export const setDetailPageAttribute = (attribute, value) => {
  const detailPage = document.querySelector("detail-page");
  detailPage.setAttribute(attribute, value);
};
