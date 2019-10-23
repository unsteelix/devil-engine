import React from 'react'


export class PasswordShell extends React.Component {
  
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = { 
      value: ''
    };
  
  }

  onChangeInput(e){
    let value = e.target.value;
    this.setState(state => ({
      value: value
    }));

    // проверка на правильность пароля
    if(value == this.props.password){
      this.props.onOpen();
    }

  }

  componentDidMount() {

  }

  render() {
    const { password } = this.props
    return (
      <div className="PasswordShell">
        <input type="text" placeholder='' onChange={this.onChangeInput} value={this.state.value} />
      </div>
    )

  }
}