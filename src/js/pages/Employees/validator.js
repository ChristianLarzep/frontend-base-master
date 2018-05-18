import validate from '../../lib/validate';

export const constraints = {
  name: {
    presence: true,
    length: {
      minimum: 8,
    },
  },
  position: {
    presence: true,
  },
  phone: {
    presence: true,
  },
  email: {
    presence: true,
  },
};
export default values => validate(values, constraints);
