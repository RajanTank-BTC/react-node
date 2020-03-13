import React from 'react'
import { Table } from 'react-bootstrap'
import { userInfo } from '../api/login'


class Info extends React.Component {

  state = {
    data: {}
  }

  componentDidMount() {
    userInfo().then(res => {
      console.log(res)
      this.setState({
        data: res.data.user
      })
    }).catch(error => {
      console.log(error.response)
    })
  }

  redirectToEditScreen = () => {
    this.props.history.push('/edit-profile')
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ margin: 20, color: '#4165ff', fontSize: 20, textAlign: 'center' }} onClick={() => this.redirectToEditScreen()}>Edit Profile</span>
        </div>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data && data.first_name}</td>
              <td>{data && data.last_name}</td>
              <td>{data && data.email}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Info