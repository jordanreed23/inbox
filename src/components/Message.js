import React, {Component} from 'react';

class Message extends Component {
  state = {
    selected: false,
    starred: this.props.starred
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
      return "";
    }
  }

  selector = () => {
    this.setState((prevState) => ({
      selected: this.toggleBool(prevState.selected)
    }));
  }

  star = () => {
    console.log('clicked');
    this.setState((prevState) => ({
      starred: this.toggleBool(prevState.starred)
    }));
  }

  toggleBool(state){
    if(state){
      return false;
    }else{
      return true;
    }
  }

  getLabels(){
    return (
      this.props.labels.map(label =>{
        return (<span className="label label-warning">{label}
        </span>);
      })
    )
  }

  isStarred(){
    if (this.state.starred) {
      return "star fa fa-star";
    }else{
      return "star fa fa-star-o";
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
            <i className={this.isStarred()} onClick={this.star}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {this.getLabels()}
        <a href="#">
          {this.props.subject}
        </a>
      </div>
    </div>);
  }
}

export default Message
