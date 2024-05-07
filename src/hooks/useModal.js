import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, setFormId, setFormAction } from '../store';

export const useModal = (modalId, formId, formAction) => {
  const dispatch = useDispatch();
 
  const { isOpen, modalId: getModalId,  formId: getFormId, formAction: getFormAction} = useSelector((state) => state.modal);

  const handleModal = () => {
    dispatch(toggleModal(modalId !== getModalId ? modalId : null));
    dispatch(setFormId(formId !== getFormId ? formId : null));
    dispatch(setFormAction(formAction !== getFormAction ? formAction : null));
  };

  return { isOpen: isOpen && getModalId === modalId, handleModal,
    getFormId, getFormAction
  };
};

