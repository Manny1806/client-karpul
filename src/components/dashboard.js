import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Tab from './tab';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="dashboard">
                <div className="header-username">
                    Welcome {this.props.username}
                </div>
                <Tab {...this.props}/>
            </div>

        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
    };
};

export default requiresLogin()(withRouter(connect(mapStateToProps)(Dashboard)));
