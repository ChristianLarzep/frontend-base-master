import validate from '../../lib/validate';

export const constraints = {
  name: {
    presence: true,
    length: {
      minimum: 8,
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
    },
  },
  security_question: {
    presence: true,
  },
  security_answer: {
    presence: true,
  },
  terms: {
    presence: true,
  },
};
export default values => validate(values, constraints);
