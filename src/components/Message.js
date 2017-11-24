import React, {Component} from 'react';

class Message extends Component {
  state = {
    selected: false
  }

  isRead() {
    if (this.props.read) {
      return "row message read" + this.isSelected();
    } else {
      return "row message unread" + this.isSelected();
    }
  }

  isSelected() {
    if (this.state.selected) {
      return " selected";
    } else {
      return;
    }
  }

  selector = () => {
    this.setState((prevState) => ({
      selected: this.toggleBool(prevState.selected)
    }));
  }

  toggleBool(state){
    if(state){
      return false;
    }else{
      return true;
    }
  }

  render() {
    return (<div className={this.isRead()}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onClick={this.selector}/>
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <span className="label label-warning">dev</span>
        <span className="label label-warning">gschool</span>
        <a href="#">
          {this.props.subject}
        </a>
      </div>
    </div>);
  }
}

export default Message
