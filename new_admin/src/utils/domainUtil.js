import {
  CLOUD_BASE_DOMAIN,
  CLOUD_DOMAIN_NUMBER,
  DOMAIN_NUMBER_KEY,
  SERVER28_BASE_DOMAIN,
  SERVER28_DOMAIN_NUMBER,
} from "../constants/index";

export const activatedNumber = () => {
  const domainNumber = localStorage.getItem(DOMAIN_NUMBER_KEY);
  if (domainNumber && !isNaN(domainNumber)) {
    return Number(domainNumber);
  }
  return CLOUD_DOMAIN_NUMBER;
};

export const getMhxDomain = () => {
  const domainNumber = activatedNumber();

  switch (domainNumber) {
    case CLOUD_DOMAIN_NUMBER:
      return CLOUD_BASE_DOMAIN;

    case SERVER28_DOMAIN_NUMBER:
      return SERVER28_BASE_DOMAIN;

    default:
      return CLOUD_BASE_DOMAIN;
  }
};

export const setDomainNumber = (domainNumber) => {
  localStorage.setItem(DOMAIN_NUMBER_KEY, domainNumber);
};
