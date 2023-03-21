import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

import { apiDeleteContact } from "../../data/contacts";
import { getErrorMessage } from "../../util/functions";

interface IDeleteContactModalProps {
  isVisible: boolean;
  onHide: () => void;
  contactId: string;
  fetchContactsData: () => Promise<void>;
  setError: (error: string) => void;
}

export const DeleteContactConfirmModal = ({
                                            isVisible,
                                            onHide,
                                            contactId,
                                            fetchContactsData,
                                            setError,
                                          }: IDeleteContactModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteContact = async () => {
    try {
      setIsLoading(true);
      await apiDeleteContact(contactId);
      await fetchContactsData();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      onHide();
    }
  };

  return (
    <Modal show={ isVisible } onHide={ onHide } data-testid="delete-contact-modal">
      <Modal.Header closeButton>
        <Modal.Title>Delete contact</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete contact?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" onClick={ deleteContact }>
          {
            isLoading &&
						<Spinner
							animation="border"
							size="sm"
						/>
          }
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
