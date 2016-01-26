import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function() {
    return {
      view: 'Message'
    }
  },
  renderView: function(view) {
    this.setState({view: view});
  },
  render: function() {
    return (
      <div className="app-container">
        <div className="col-xs-5 col-md-4 col-lg-3 interface-container-right">
          <ImageContainer />
          <NavigationContainer changeView={this.renderView} />
        </div>
        <div className="col-xs-7 col-md-8 col-lg-9 interface-container-right">
          <ContentContainer view={this.state.view} />
        </div>
      </div>
    )
  }
});

var ImageContainer = React.createClass({
  render: function() {
    return <img src="http://placehold.it/150x150" />
  }
});

var NavigationContainer = React.createClass({
  render: function() {
    return (<div>
        <a href="#"><h3 onClick={this.renderMessage}>Messages</h3></a>
         <a href="#"><h3 onClick={this.renderFinance}>Finance</h3></a>
         <a href="#"><h3 onClick={this.renderChore}>Chores</h3></a>
      </div>
    )
  },
  renderMessage() {
    this.props.changeView('Message');
  },
  renderFinance() {
    this.props.changeView('Finance');
  },
  renderChore() {
    this.props.changeView('Chore');
  }
});

var ContentContainer = React.createClass({
  render: function() {
    if (this.props.view === 'Message') {
      return <MessageContainer />
    } else if (this.props.view === 'Chore') {
      return <ChoreContainer />
    } else if (this.props.view === 'Finance') {
      return <FinanceContainer />
    }
  }
});

var MessageContainer = React.createClass({
  getInitialState: function() {
    this.loadMessages(); 
    return {
      messages: []
    }
  }, 
  // need to receive 
  // username *** need to query using userId to get username
  // messageText
  // timestamp
  loadMessages: function() {
    $.ajax({
      //eventually need to pass in :houseId instead of 1
      url: 'http://localhost:8080/messages/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(messages) {
        console.log(messages);
        this.setState({messages: messages});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  }, 

  // userId
  // text
  formSubmit: function(message) { 
    console.log('MESSAGE', message);
    $.ajax({
      url: 'http://localhost:8080/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('got here'); 
        this.loadMessages();
      }.bind(this)
    });
  },

  render: function() {
    //this.loadMessages(); 
    console.log('this.state.messages', this.state.messages); 
    var messageList = this.state.messages.map(function(item, i) {
      return <MessageEntry key={i} message={item} />
    })
    return (
      <div className="message-container">
        <div>
          <h2 className="text-center">Messages</h2>
          {messageList}
        </div>
        <MessageForm formSubmit={this.formSubmit}/>
      </div>
    )
  }
});

var MessageEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.message.userId}
        {this.props.message.text}
        {this.props.message.houseId}
      </div>
    )
  }
});

var MessageForm = React.createClass({
  localSubmit: function(event) {
    event.preventDefault();
    var username = this.refs.username.value;
    var messageText = this.refs.message.value;
    var messageObj = {
      userId: username,
      text: messageText,
      houseId: 1
    }
    this.props.formSubmit(messageObj);
    this.refs.messageForm.reset()
  },

  render: function() {
    return (
      <div>
        <form className="message-form form-group" ref='messageForm' onSubmit={this.localSubmit}>
          <label htmlFor="username-input">UserId</label>
          <input id="username-input" className="form-control" type='text' name='username' ref='username'/>
          <label htmlFor="message-input">Message</label>
          <textarea name="comment" className="form-control" id="message-input" rows="3" ref='message'>
          </textarea>
          <button type="submit" className="btn btn-info">Submit</button>
        </form>
      </div>
    )
  }
})

var ChoreContainer = React.createClass({
  getInitialState: function () {
    this.loadChores();
    return {
      chores: []
    }
  },

  loadChores: function () {
    $.ajax({
      //eventually need to pass in :houseId instead of 1
      url: 'http://localhost:8080/chores/1',
      type: 'GET',
      contentType: 'application/json',
      success: function (chores) {
        this.setState({chores: chores});
      }.bind(this),
      error: function (err) {
        console.log(err);
      }
    })
  },

  formSubmit: function (chore) {
    $.ajax({
      url: 'http://localhost:8080/chores',
      type: 'POST',
      data: JSON.stringify(chore),
      contentType: 'application/json',
      success: function (data) {
        this.loadChores();
      }.bind(this)
    });
  },

  render: function() {
    var choreList = this.state.chores.map(function(item, i) {
      return <ChoreEntry key={i} chore={item} />
    })
    return (
      <div>
        <div className="chore-container">
          <h2 className="text-center">Chores</h2>
          {choreList}
        </div>
        <ChoreForm formSubmit={this.formSubmit}/>
      </div>
    )
  }
});

var ChoreEntry = React.createClass({
  render: function () {
    return (
    <div>
      {this.props.chore.userId}
      {this.props.chore.name}
      {this.props.chore.category}
      {this.props.chore.dueDate}
      <button>Completed</button>
    </div>
    )
  }
});

var ChoreForm = React.createClass({
  localSubmit: function (event) {
    event.preventDefault();
    var userId = this.refs.userId.value;
    var dueDate = this.refs.dueDate.value;
    var name = this.refs.name.value;
    var category = this.refs.category.value;
    var houseId = this.refs.houseId.value;
    var choreObject = {
      userId: userId,
      dueDate: dueDate,
      name: name,
      category: category,
      houseId: houseId
    }
    this.props.formSubmit(choreObject);
    this.refs.choreForm.reset()
  },

  render: function () {
    return (
      <div>
        <form ref='choreForm' onSubmit={this.localSubmit}>
          UserId: <input type='text' name='userId' ref='userId' placeholder='user id'/>
          <input type='text' name='name' ref='name' placeholder='chore Name'/>
          <input type='date' name='dueDate' ref='dueDate' /> 
          <input type='text' name='category' ref='category' placeholder='category' />
          <input type='number' name='houseId' ref='houseId' placeholder='House Id'/> 
          <input type='submit' value='submit'/>
        </form>
      </div>
    )
  }
})


var FinanceContainer = React.createClass({
  getInitialState: function() {
    this.loadBills();
    return {
      bills: [{name: 'water', total: 200, dueDate: 'string'}],
      paymentsOwed: [{paid: false, total: 300}], 
      history: [{name: 'rent', total: 1250}]
    }
  },

  // name
  // total
  // dueDate
  // payee_username
  // payee_userId

  loadBills: function() {
    $.ajax({
      url: 'http://localhost:8080/payment/pay/1',
      type: 'GET',
      contentType: 'application/json',
      success: function(bills) {
        console.log('BILLS', bills);
        this.setState({bills: bills});
      }.bind(this),
      error: function(err) {
        console.log(err);
      }
    })
  },

  render: function() {
    var billList = this.state.bills.map(function(item, i) {
      return <BillEntry key={i} bill={item} />
    }); 
    var paymentsOwedList = this.state.paymentsOwed.map(function(item, i) {
      return <PaymentOwedEntry key={i} paymentOwed={item} />
    });
    var historyList = this.state.history.map(function(item, i) {
      return <HistoryEntry key={i} history={item} />
    });
    return (
      <div className="finance-container">
        <h2 className="text-center">Finance</h2>
        <div className='bill-list'>
          <h4 className="text-center">Bills</h4>
          {billList}
        </div>
        <div className='payments-owed-list'>
          <h4 className="text-center">Payments Owed</h4>
          {paymentsOwedList}
        </div>
        <div className='history-list'>
          <h4 className="text-center">History</h4>
          {historyList}
        </div>
        <BillForm addBill={this.addBill}/>
      </div>
    )
  }
});

var BillForm = React.createClass({
  splitEvenly: function() {
    //access this.refs.amount.value
    var total = this.refs.amount.value;
    //divide total by number of roommates 
  },

  createBill: function(event) {
    //prevent default event action
    event.preventDefault();
    //create bill object based on user input
    var bill = {
      total: this.refs.amount.value,
      name: this.refs.name.value,
      dueDate: this.refs.dueDate.value
    };
    //call addBill with this object. 
    this.props.addBill(bill); 
    //reset input fields
    this.refs.billForm.reset();
  },


  render: function() {
    return (
      <div>
        <h4 className="text-center">Create A New Bill</h4>
        <div className='bill-form'>
          <form action="submit" ref='billForm' onSubmit=''>
            <div className='input'>
              Bill Name: <input type="text" ref='name'/>
              Bill Amount: <input type="number" ref='amount'/>
              Bill Due Date: <input type="date" ref='dueDate'/>
              <button onClick={this.splitEvenly}>Split Evenly</button>
            </div>
            <div className='submission'>
              <button onClick=''>Submit Bill</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
})

var BillEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.bill.name}
        {this.props.bill.total}
        {this.props.bill.dueDate}
      </div>
    )
  }
}); 

var PaymentOwedEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.paymentOwed.amount}
      </div>
    )
  }
})

var HistoryEntry = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.history.name}
        {this.props.history.total}
      </div>
    )
  }
})

// var BillList = React.createClass({
//   render: function() {
//     return (
      
//     )
//   }
// })

// var PaymentOwedList = React.createClass({
//   render: function() {
//     return (
      
//     )
//   }
// })

// var HistoryList = React.createClass({
//   render: function() {
//     return (
      
//     )
//   }
// })

//addBill is a function that will create a new bill and post it
  //to the database. However, we don't have that route set up yet,
  //and need to verify schema as well. 
  
  // addBill: function(bill) { 
  //   console.log('MESSAGE', bill);
  //   $.ajax({
  //     url: 'http://localhost:8080/payments/bills',
  //     type: 'POST',
  //     data: JSON.stringify(bill),
  //     contentType: 'application/json',
  //     success: function(data) {
  //       console.log('got here'); 
  //       this.loadBills();
  //     }.bind(this)
  //   });
  // },

ReactDOM.render(<App />, document.querySelector('#app'));