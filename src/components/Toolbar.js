import React from 'react';
import Messages from './Messages';

let data = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  }, {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  }, {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  }, {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  }, {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  }, {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  }, {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  }, {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class Toolbar extends React.Component {
  constructor() {
    super();
    for (var i = 0; i < data.length; i++) {
      data[i].selected = false;
    }
    this.state = {
      checked: false,
      someChecked: false,
      data: data
    };

  }

  starClick(i) {
    let newData = this.state.data;
    newData[i].starred = !newData[i].starred
    this.setState({data: newData})
  }

  selectedClick(i) {
    let newData = this.state.data;
    let allChecked = true;
    let allUnchecked = true;
    newData[i].selected = !newData[i].selected
    for (var j = 0; j < newData.length; j++) {
      if (newData[j].selected) {
        allUnchecked = false;
      } else {
        allChecked = false;
      }
    }
    if (allChecked) {
      this.setState({
        checked: true,
        someChecked: false,
        data: newData
      })
    }else if(allUnchecked){
      this.setState({
        checked: false,
        someChecked: false,
        data: newData
      })
    } else {
      this.setState({
        checked: false,
        someChecked: true,
        data: newData
      })
    }
  }

  checkAll = () => {
    let newData = this.state.data;
    let flag = true;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        continue;
      } else {
        newData[i].selected = true;
        flag = false;
      }
    }
    if (flag) {
      for (i = 0; i < newData.length; i++) {
        newData[i].selected = false;
      }
      this.setState({checked: false,
        someChecked: false,
        data: newData})
    } else {
      this.setState({checked: true,
        someChecked: false,
        data: newData})
    }
  }

  isChecked() {
    if (this.state.checked) {
      return "fa fa-check-square-o";
    } else if (this.state.someChecked) {
      return "fa fa-minus-square-o";
    } else {
      return "fa fa-square-o";
    }
  }

  markAsRead = () => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        newData[i].read = true;
      }
    }
    this.setState({
      data: newData
    })
  }

  markAsUnRead = () => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        newData[i].read = false;
      }
    }
    this.setState({
      data: newData
    })
  }

  countUnread(){
    let count = 0;
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].read) {
        count++;
      }
    }
    return count;
  }

  deleteMessages = () => {
    console.log('click');
    let newData = [];
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].selected) {
        newData.push(this.state.data[i])
      }
    }
    this.setState({
      data: newData,
      checked: false,
      someChecked:false
    })
  }

  addLabel = (e) => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        let add = true;
        for (var j = 0; j < newData[i].labels.length; j++) {
          if(newData[i].labels[j] === e.target.value){
            add = false;
          }
        }
        if (add) {
          newData[i].labels.push(e.target.value)
        }
      }
    }
    this.setState({
      data: newData,
    })
  }

  removeLabel = (e) => {
    let newData = this.state.data;
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        let remove = false;
        for (var j = 0; j < newData[i].labels.length; j++) {
          if(newData[i].labels[j] === e.target.value){
            remove = true;
            break;
          }
        }
        if (remove) {
           newData[i].labels.splice(newData[i].labels.indexOf(e.target.value), 1)
        }
      }
    }
    this.setState({
      data: newData,
    })
  }

  checkDisabled() {
    for (var i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].selected){
        return "";
      }
    }
    return "disabled";
  }

  render() {
    return (<div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.countUnread()}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.checkAll}>
            <i className={this.isChecked()}></i>
          </button>

          <button className="btn btn-default" onClick={this.markAsRead} disabled={this.checkDisabled()}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.markAsUnRead} disabled={this.checkDisabled()}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={this.addLabel} disabled={this.checkDisabled()}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.removeLabel} disabled={this.checkDisabled()}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.deleteMessages}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
      <Messages data={this.state.data}
        starClick={i => this.starClick(i)} selectedClick={i => this.selectedClick(i)}/>
    </div>);
  }
}

export default Toolbar
