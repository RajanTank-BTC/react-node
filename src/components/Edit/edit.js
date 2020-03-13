import React from 'react'
import { userInfo, updateValues } from '../api/login'
import { Row, FormGroup, FormControl, FormLabel as ControlLabel, Button, HelpBlock, Spinner } from 'react-bootstrap';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';


class EditProfile extends React.Component {

  state = {
    formData: {}, // Contains login form data
    errors: {}, // Contains login field errors
    formSubmitted: false, // Indicates submit status of login form
    loading: true // Indicates in progress state of login form
  }

  componentDidMount() {
    console.log("new")
    userInfo().then(res => {
      console.log(res)
      this.setState({
        formData: res.data.user, loading: false
      })
    }).catch(error => {
      console.log(error.response)
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData
    });
  }

  updateValue = () => {
    const { formData } = this.state
    let body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email
    }
    updateValues(body).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error.response)
    })
  }

  render() {
    const { errors, formSubmitted, loading, formData } = this.state
    console.log(formData)
    return (
      <div className="hello">
        {loading ?
          <Spinner animation="grow" /> :
          <form>
            <FormGroup controlId="first_name">
              <ControlLabel>Email</ControlLabel>
              <FormControl value={formData.first_name} type="text" name="first_name" placeholder="Enter your first name" autoComplete="off" onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup controlId="last_name">
              <ControlLabel>Email</ControlLabel>
              <FormControl type="text" value={formData.last_name} name="last_name" placeholder="Enter your last name" autoComplete="off" onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
              <ControlLabel>Email</ControlLabel>
              <FormControl type="text" name="email" value={formData.email} placeholder="Enter your email" autoComplete="off" onChange={this.handleInputChange} />
              {/* {errors.email &&
                <HelpBlock>{errors.email}</HelpBlock>
              } */}
            </FormGroup>
            <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" name="password" value={formData.password} placeholder="Enter your password" onChange={this.handleInputChange} />
              {/* {errors.password &&
                <HelpBlock>{errors.password}</HelpBlock>
              } */}
            </FormGroup>
            <Button onClick={() => this.updateValue()} bsStyle="primary">Update</Button>
          </form>
        }

      </div>
    )
  }
}

export default EditProfile