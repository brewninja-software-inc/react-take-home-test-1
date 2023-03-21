import { IContact } from "../data/contacts";

export const contactsSortByNameFunction = (a: IContact, b: IContact) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}
