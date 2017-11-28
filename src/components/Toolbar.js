import React from 'react';
import Messages from './Messages';

class Toolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      someChecked: false,
      data: []
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    let data = json["_embedded"].messages
    // for (var i = 0; i < data.length; i++) {
    //   data[i].selected = false;
    // }
    this.setState({data: json["_embedded"].messages})
  }

  async changeItem(item, data) {
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.setState({data: data})
  }

  starClick(i) {
    let newData = this.state.data;
    newData[i].starred = !newData[i].starred
    let patchData = {
      "messageIds": [this.state.data[i].id],
      "command": "star",
      "star": newData[i].starred
    }
    this.changeItem(patchData, newData)
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
      this.setState({checked: true, someChecked: false, data: newData})
    } else if (allUnchecked) {
      this.setState({checked: false, someChecked: false, data: newData})
    } else {
      this.setState({checked: false, someChecked: true, data: newData})
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
      this.setState({checked: false, someChecked: false, data: newData})
    } else {
      this.setState({checked: true, someChecked: false, data: newData})
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

  markAsRead(isRead) {
    let newData = this.state.data;
    let patchData = {
      "messageIds": [],
      "command": "read",
      "read": isRead
    }
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        newData[i].read = isRead;
        patchData.messageIds.push(newData[i].id)
      }
    }
    this.changeItem(patchData, newData)
  }

  countUnread() {
    let count = 0;
    for (var i = 0; i < this.state.data.length; i++) {
      if (!this.state.data[i].read) {
        count++;
      }
    }
    return count;
  }

  deleteMessages = () => {
    let newData = [];
    let patchData = {
      "messageIds": [],
      "command": "delete"
    }
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected) {
        patchData.messageIds.push(this.state.data[i].id)
      } else {
        newData.push(this.state.data[i]);
      }
    }
    this.changeItem(patchData, newData)
    this.setState({checked: false, someChecked: false})
  }

  addLabel = (e) => {
    let newData = this.state.data;
    let patchData = {
      "messageIds": [],
      "command": "addLabel",
      "label": e.target.value
    }
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        let add = true;
        for (var j = 0; j < newData[i].labels.length; j++) {
          if (newData[i].labels[j] === e.target.value) {
            add = false;
          }
        }
        if (add) {
          newData[i].labels.push(e.target.value)
          patchData.messageIds.push(newData[i].id)
        }
      }
    }
    this.changeItem(patchData, newData)
  }

  removeLabel = (e) => {
    let newData = this.state.data;
    let patchData = {
      "messageIds": [],
      "command": "removeLabel",
      "label": e.target.value
    }
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].selected) {
        let remove = false;
        for (var j = 0; j < newData[i].labels.length; j++) {
          if (newData[i].labels[j] === e.target.value) {
            remove = true;
            break;
          }
        }
        if (remove) {
          newData[i].labels.splice(newData[i].labels.indexOf(e.target.value), 1);
          patchData.messageIds.push(newData[i].id);
        }
      }
    }
    this.changeItem(patchData, newData)
  }

  checkDisabled() {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].selected) {
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

          <button className="btn btn-default" onClick={() => this.markAsRead(true)} disabled={this.checkDisabled()}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => this.markAsRead(false)} disabled={this.checkDisabled()}>
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
      <Messages data={this.state.data} starClick={i => this.starClick(i)} selectedClick={i => this.selectedClick(i)}/>
    </div>);
  }
}

export default Toolbar
