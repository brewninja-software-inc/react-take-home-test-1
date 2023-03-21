import {render, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { MainPage } from "./MainPage";

const FAKE_CONTACT = [{
	id:"54310027-c4e8-45bb-ad25-4d2387ff97ae",
	name:"test",
	phone:"test",
	age:"1",
	email:"test@test.com"
}]

beforeAll(() => {
	localStorage.setItem('contacts', JSON.stringify(FAKE_CONTACT))
})

test('create contact modal is visible after create new click', async () => {
	render(<MainPage />);

	await waitFor(async () => {
		await userEvent.click(screen.getByText('Create New'))
	});

	expect(screen.getByTestId('create-modal')).toBeVisible();
	expect(screen.getByTestId('create-modal')).toBeInTheDocument();
});

test('edit contact modal is visible after edit click', async () => {
	render(<MainPage />);

	await waitFor(async () => {
		await userEvent.click(screen.getByText('Edit'))
	});

	expect(screen.getByTestId('create-modal')).toBeVisible();
	expect(screen.getByTestId('create-modal')).toBeInTheDocument();
});

test('delete contact confirm modal is visible after delete click', async () => {
	render(<MainPage />);

	await waitFor(async () => {
		await userEvent.click(screen.getByText('Delete'))
	});

	expect(screen.getByTestId('delete-contact-modal')).toBeVisible();
	expect(screen.getByTestId('delete-contact-modal')).toBeInTheDocument();
});

