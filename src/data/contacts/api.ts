import {IContact} from "./types";
import {getContacts, saveContacts} from "./storage";

const fakeApiDelay = 1500;

/**
 * Fetch all existing contacts from the remote storage.
 */
export function fetchAllContacts(): Promise<IContact[]> {
    const result = getContacts();
    return new Promise(resolve => setTimeout(() => resolve(result), fakeApiDelay));
}

/**
 * Add a new contact to remote storage.
 * @param contact the new contact to add.
 */
export function addContact(contact: IContact): Promise<void> {
    const contacts = getContacts();
    contacts.push(contact);
    saveContacts(contacts);
    return new Promise(resolve => setTimeout(resolve, fakeApiDelay));
}

/**
 * Remove a contact from the remote storage.
 * @param id id fo the contact to delete
 */
export function deleteContact(id: string): Promise<void> {
    const contacts = getContacts();
    const index = contacts.findIndex(x => x.id === id);
    if(index < 0) {
        throw new Error(`Could not find Contact to delete with id=${id}`);
    }
    contacts.splice(index, 1);
    saveContacts(contacts);
    return new Promise(resolve => setTimeout(resolve, fakeApiDelay));
}

/**
 * Update all properties of a contact.
 * The contact will be matched based on the `id` property.
 * @param contact the contact to update.
 */
export function updateContact(contact: IContact): Promise<void> {
    const contacts = getContacts();
    const index = contacts.findIndex(x => x.id === contact.id);
    if(index < 0) {
        throw new Error(`Could not find Contact to update with id=${contact.id}`);
    }
    contacts[index] = contact;
    saveContacts(contacts);
    return new Promise(resolve => setTimeout(resolve, fakeApiDelay));
}
