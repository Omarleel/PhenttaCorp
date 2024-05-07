import { FaTimes } from 'react-icons/fa';
import { useModal } from '../hooks/useModal';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const CustomModal = ({ id, formId, formAction, buttonTitle, buttonStyle = "btn-primary", buttonIcon, modalTitle, modalContent, modalFooter, lockedBackground = false }) => {
  const { isOpen, handleModal } = useModal(id, formId, formAction);
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
    }, 200);
  };
  useEffect(() => {
    const section = document.getElementById('primary-container');
    if (isOpen) {
      section.classList.add('overflow-hidden');
    } else {
      section.classList.remove('overflow-hidden');
    }
  }, [isOpen])
  
  return (
    <>
      <button
        className={`${ buttonStyle }`}
        type="button"
        onClick={handleModal}
      >
        <div className={`flex items-center justify-between ${buttonTitle ? 'space-x-2' : ''}`}>
        {buttonTitle && (
            <div>
              {buttonTitle}
            </div>
          )}
          {buttonIcon && (
            <div>
              {buttonIcon}
            </div>
          )}
        </div>
      </button>
      {
        isOpen ? (
          <div
          className="cursor-auto fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none !mx-0"
            onClick={lockedBackground ? handleLock : handleModal}
          >
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div
              className="relative  w-2/4 my-6 mx-auto max-[768px]:w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`transition-transform duration-300 ease-out border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary-light outline-none focus:outline-none dark:bg-primary-dark ${isLocked ? 'modal-static' : ''}`}>
                <div className="flex items-center justify-between p-4 border-b border-solid border-gray-300 rounded-t">
                  <h2 className="mb-0">{modalTitle}</h2>
                  <button
                    className="flex items-center justify-center bg-gray-300 rounded-full p-1 hover:bg-gray-400 transition duration-300 focus:outline-none"
                    onClick={handleModal}
                  >
                    <FaTimes className="text-black opacity-70 h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 flex-auto max-h-full overflow-auto">
                  {modalContent}
                </div>
                {
                  modalFooter && (
                    <div className="flex p-6 border-t border-solid border-blueGray-200 rounded-b">
                      {modalFooter}
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        ) : null
      }
    </>
  );
}

CustomModal.propTypes = {
  id: PropTypes.string.isRequired,
}
