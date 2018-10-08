import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {contractLogs as contractLogsAction, listenToContractLogs} from '../actions';

import ContractLogger from '../components/ContractLogger';
import DataWrapper from "../components/DataWrapper";
import {getContractLogsByContract} from "../reducers/selectors";

class ContractLoggerContainer extends Component {
  componentDidMount() {
    if (this.props.contractLogs.length === 0) {
      this.props.listenToContractLogs();
      this.props.fetchContractLogs(this.props.contract.className);
    }
  }

  render() {
    return (
      <DataWrapper shouldRender={this.props.contractLogs !== undefined } {...this.props} render={() => (
        <ContractLogger contractLogs={this.props.contractLogs} contractName={this.props.contract.className}/>
      )} />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    contractLogs: getContractLogsByContract(state, props.contract.className)
  };
}

ContractLoggerContainer.propTypes = {
  contract: PropTypes.object,
  contractLogs: PropTypes.array,
  fetchContractLogs: PropTypes.func,
  listenToContractLogs: PropTypes.func,
  match: PropTypes.object
};

export default connect(
  mapStateToProps,
  {
    fetchContractLogs: contractLogsAction.request,
    listenToContractLogs: listenToContractLogs
  }
)(ContractLoggerContainer);
