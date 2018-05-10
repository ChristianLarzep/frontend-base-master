import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';

import * as modalActions from '../../store/actions/modal';
import { getModalState } from '../../store/reducers/modal';
import {
  Animation,
  Button,
  ModalAnimation,
  Checkbox,
  Dropdown,
  RadioButton,
  Select,
  EmptyState,
  ErrorMessage,
  Helmet,
  NumberFormat,
  PageSelector,
  SimpleSwitch,
  TextField,
  Tooltip,
} from '../../components';

import { Modal, Header } from './components';
import './style.scss';

const mapStateToProps = state => {
  const { user } = state;
  return {
    user,
    role: user.role,
    token: user.token,
    modalDemo: getModalState('modalDemo', state),
  };
};

const actions = { ...modalActions };

@reduxForm({ form: 'formTest' })
@connect(mapStateToProps, actions)
class App extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    modalDemo: PropTypes.shape({
      showModal: PropTypes.bool,
    }),
    openModal: PropTypes.func,
    user: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      checkbox: false,
      radiobutton: false,
      simpleswitch: false,
      listEntries: [],
      showAnimation: false,
      currentPage: 1,
    };
  }

  onChangeCheckbox = () => {
    const { checkbox } = this.state;
    this.setState({ checkbox: !checkbox });
  };

  onChangeRadioButton = () => {
    const { radiobutton } = this.state;
    this.setState({ radiobutton: !radiobutton });
  };

  onChangeSwitch = () => {
    const { simpleswitch } = this.state;
    this.setState({ simpleswitch: !simpleswitch });
  };

  handleSubmitForm = () => {};

  changePage = page => {
    this.setState({ currentPage: page });
  };

  toggleCreateEntry = () => {
    const { listEntries } = this.state;
    listEntries.push('Registro ', listEntries.length + 1);
    this.setState({ listEntries });
  };

  toggleAnimation = () => {
    const { showAnimation } = this.state;
    this.setState({ showAnimation: !showAnimation });
  };

  render() {
    const { user, modalDemo, openModal, closeModal } = this.props;

    const {
      checkbox,
      radiobutton,
      simpleswitch,
      listEntries,
      showAnimation,
      currentPage,
    } = this.state;

    return (
      <div styleName="app-container">
        <Header />
        <div className="container">
          <div className="row">
            <h1>Page Title</h1>
            <div className="col-6">
              <h4>Text</h4>
              <p>
                Sed odio lorem, cursus eu lobortis vel, euismod sit amet orci.
                In nibh lacus, gravida et velit quis, ornare porta est. Quisque
                vitae nulla sed lorem ultricies vehicula. Etiam non tincidunt
                urna. Phasellus ut commodo neque. Phasellus blandit interdum
                urna, id malesuada mi gravida finibus. Sed turpis nibh, euismod
                ut mi vitae, tempor interdum augue. Aenean non pretium ex, ut
                vehicula lacus. Aenean at nisi et arcu dictum posuere. Quisque
                hendrerit nisi ac lorem mollis, in convallis massa porta. Sed
                ultricies id dolor vitae malesuada.
              </p>
            </div>
            <div className="col-6">
              <h4>Variables scss</h4>
              <div styleName="base-gray">base-gray</div>
              <div styleName="dark-gray">dark-gray</div>
              <div styleName="darker-gray">darker-gray</div>
              <div styleName="black-gray">black-gray</div>
              <div styleName="light-gray">light-gray</div>
              <div styleName="lighter-gray">lighter-gray</div>
              <div styleName="lightest-gray">lightest-gray</div>
            </div>
          </div>

          <div className="row">
            <h3>Store Data</h3>
            <p>Name: {user.name}</p>
          </div>

          <div className="row">
            <h3>Components</h3>

            <Helmet>
              <title>Cambio título Helmet</title>
              <link rel="link-helmet-react" />
            </Helmet>

            <div className="col-6">
              <div className="row">
                <h4>Buttons</h4>
                <div className="col-3">
                  <Button className="btn-primary">Primary</Button>
                </div>

                <div className="col-3">
                  <Button className="btn-info">Info</Button>
                </div>

                <div className="col-3">
                  <Button className="btn-warning">Warning</Button>
                </div>

                <div className="col-3">
                  <Button className="btn-error">Error</Button>
                </div>
              </div>

              <div className="row">
                <h4>Actions</h4>

                <div className="col-6">
                  <Button onClick={() => openModal('modalDemo')}>
                    Open modal
                  </Button>
                </div>

                <div className="col-6">
                  <Button
                    onClick={() => this.toggleAnimation()}
                    className="btn-success"
                  >
                    Launch Animation
                  </Button>

                  <Animation name="fade-in" time={1000}>
                    {showAnimation && <span>Sorpresa</span>}
                  </Animation>
                </div>
              </div>

              <div className="row">
                <h4>Alerts</h4>

                <ErrorMessage
                  className="error-message"
                  type="alert"
                  error={{ code: 100 }}
                  id="err-ms"
                />
              </div>

              <div className="row">
                <h4>Empty State</h4>
                <h5>List of Entries</h5>
                {listEntries.length === 0 && (
                  <EmptyState
                    description={<p>No entries found</p>}
                    buttonText={<span>Create entry</span>}
                    onClick={() => this.toggleCreateEntry()}
                  />
                )}
                <div className="col-12">{listEntries}</div>
              </div>
            </div>

            <div className="col-6">
              <div className="row">
                <h4>Format</h4>
                <NumberFormat
                  value={0.0012}
                  type="currency"
                  prefix="$"
                  decimals={3}
                />
                <br />
                <NumberFormat
                  value={3.777}
                  type="currency"
                  prefix="&euro;"
                  decimals={2}
                />
              </div>

              <div className="row">
                <span>Page Selector: </span>
                <PageSelector
                  currentPage={currentPage}
                  totalPages={8}
                  onChangePage={newPage => this.changePage(newPage)}
                />
              </div>

              <div className="row">
                <h4>Inputs</h4>
                <div className="col-4">
                  <Checkbox
                    name="Checkbox1"
                    labelText="Checkbox"
                    checked={checkbox}
                    onClick={() => this.onChangeCheckbox()}
                  />
                </div>

                <div className="col-4">
                  <RadioButton
                    name="RadioButton1"
                    labelText="RadioButton"
                    checked={radiobutton}
                    onClick={() => this.onChangeRadioButton()}
                  />
                </div>

                <div className="col-4">
                  <SimpleSwitch
                    name="SimpleSwitch"
                    checked={simpleswitch}
                    onChange={() => this.onChangeSwitch()}
                    prefixText="prefixTxt"
                    suffixText="suffixTxt"
                  />
                </div>
              </div>

              <div className="row">
                <h4>Form</h4>
                <TextField name="TextFieldText" labelText="TextField" />

                <TextField
                  name="TextFieldNumber"
                  labelText="TextField (only numbers)"
                  type="number"
                />

                <TextField
                  name="TextFieldTextML"
                  labelText="TextField  (MultiLine)"
                  multiLine
                />

                <Tooltip target="SimpleSwitch" />

                <Form
                  method="post"
                  onSubmit={() => this.handleSubmitForm(this.onSubmit)}
                >
                  <div className="row">
                    <Field
                      name="options"
                      labelText="Dropdown"
                      options={[
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2', disabled: true },
                        {
                          value: '3',
                          label: 'Jonathan Jesus Gonzalez Herrera',
                        },
                        { value: '4', label: 'Option 4' },
                      ]}
                      component={Dropdown}
                    />
                  </div>

                  <Select name="Select1" labelText="Select">
                    <option value="opcion1">Option 1</option>
                    <option value="opcion2">Option 2</option>
                    <option value="opcion3">Option 4</option>
                  </Select>
                </Form>
              </div>
            </div>
          </div>

          <ModalAnimation timeout={2000}>
            {modalDemo.showModal && (
              <Modal
                onCancel={() => closeModal('modalDemo')}
                loading={modalDemo.loading}
                success={modalDemo.success}
                modalError={modalDemo.error}
              />
            )}
          </ModalAnimation>
        </div>
      </div>
    );
  }
}

export default App;
