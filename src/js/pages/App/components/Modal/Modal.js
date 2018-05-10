import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ErrorMessage,
} from '../../../../components';

function ModalChangePassword({
  loading,
  success,
  errors,
  onSubmit,
  onCancel,
  cancelText,
  submitText,
}) {
  return (
    <Modal className="custom-modal">
      <ModalHeader>
        <h1>Modal Title</h1>
      </ModalHeader>
      <div>
        <ModalBody>
          {!success && (
            <span>
              <div className="row">
                <ErrorMessage
                  error={errors}
                  id="modalChangePassword"
                  type="alert"
                />
              </div>

              <div className="row">
                <p>
                  Cras malesuada lacus erat, sit amet placerat libero porta ac.
                  Aliquam venenatis varius augue. Phasellus finibus tellus et
                  tellus ultrices efficitur ac et purus. Nullam luctus bibendum
                  dolor non porta. Sed ut maximus purus. Quisque sed lorem
                  sagittis, pharetra nulla sit amet, malesuada dolor. Curabitur
                  quis aliquet leo, eu interdum arcu. Nunc tristique vel nisl
                  vel maximus.
                </p>
              </div>
            </span>
          )}

          {success && (
            <div className="success-message">
              <p>Success message</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {!success && (
            <div className="row">
              <div className="col-6">
                <Button type="button" onClick={onCancel}>
                  {cancelText}
                </Button>
              </div>
              <div className="col-6">
                <Button
                  type={onSubmit ? 'button' : 'submit'}
                  color="primary"
                  spinner={loading}
                  disabled={loading}
                  onClick={onSubmit}
                >
                  {submitText}
                </Button>
              </div>
            </div>
          )}
          {success && (
            <div className="row">
              <div>
                <Button
                  type="button"
                  color="primary"
                  spinner={loading}
                  disabled={loading}
                  onClick={onSubmit}
                >
                  Finalizar
                </Button>
              </div>
            </div>
          )}
        </ModalFooter>
      </div>
    </Modal>
  );
}

ModalChangePassword.propTypes = {
  cancelText: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  submitText: PropTypes.string,
  success: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

ModalChangePassword.defaultProps = {
  cancelText: 'Cancelar',
  submitText: 'Cambiar',
};

export default ModalChangePassword;
