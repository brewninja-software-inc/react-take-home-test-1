import {IContact} from "./types";
import {getContacts, saveContacts} from "./storage";

const FAKE_NETWORK_DELAY = 750;

/**
 * Fetch all existing contacts from the remote storage.
 */
export function apiFetchAllContacts(): Promise<IContact[]> {
    const result = getContacts();
    return new Promise(resolve => setTimeout(() => resolve(result), FAKE_NETWORK_DELAY));
}

/**
 * Add a new contact to remote storage.
 * @param contact the new contact to add.
 */
export function apiAddContact(contact: IContact): Promise<void> {
    return new Promise((resolve, reject) => {
        const contacts = getContacts();
        const existingByName = contacts.find(x => x.name.toLowerCase() === contact.name.toLowerCase());
        if(existingByName) {
            reject(new Error('A contact with that name already exists'));
            return;
        }
        contacts.push(contact);
        saveContacts(contacts);
        setTimeout(resolve, FAKE_NETWORK_DELAY);
    });
}

/**
 * Update all properties of a contact.
 * The contact will be matched based on the `id` property.
 * @param contact the contact to update.
 */
export function apiUpdateContact(contact: IContact): Promise<void> {
    return new Promise((resolve, reject) => {
        const contacts = getContacts();
        const index = contacts.findIndex(x => x.id === contact.id);
        if(index < 0) {
            reject(new Error(`Could not find Contact to update with id=${contact.id}`));
            return;
        }
        const existingByName = contacts.find(x => x.name.toLowerCase() === contact.name.toLowerCase() && x.id !== contact.id);
        if(existingByName) {
            reject(new Error('A contact with that name already exists'));
            return;
        }
        contacts[index] = contact;
        saveContacts(contacts);
        setTimeout(resolve, FAKE_NETWORK_DELAY);
    });
}

/**
 * Remove a contact from the remote storage.
 * @param id id fo the contact to delete
 */
export function apiDeleteContact(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const contacts = getContacts();
        const index = contacts.findIndex(x => x.id === id);
        if(index < 0) {
            reject(new Error(`Could not find Contact to delete with id=${id}`));
            return;
        }
        contacts.splice(index, 1);
        saveContacts(contacts);
        setTimeout(resolve, FAKE_NETWORK_DELAY);
    });
}
