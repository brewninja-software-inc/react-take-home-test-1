import {IContact} from "./types";


const contactsLocalStorageKey = 'contacts';
export function saveContacts(data: IContact[]): void {
    localStorage.setItem(contactsLocalStorageKey, JSON.stringify(data));
}

export function getContacts(): IContact[] {
    const data = localStorage.getItem(contactsLocalStorageKey);
    if(!data) return [];
    return JSON.parse(data);
}
