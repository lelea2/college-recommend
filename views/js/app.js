//Determine injected area
var app = document.querySelector("#content");
Chart.defaults.global.responsive = true;

//Avoid duplication or React Router
var { Router,
      Route,
      IndexRoute,
      IndexLink,
      RouteHandler,
      browserHistory,
      Link } = ReactRouter;

function formatCurrency(number, fixFloat) {
  var tofix = fixFloat || 0;
  var num = parseFloat(number);
  return num.toFixed(tofix).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
}

//Component to view all state
var StateSelect = React.createClass({

  getInitialState: function() {
    return {
      data: [],
      optionsState: ''
    };
  },

  componentDidMount: function() {
    $.get('/data/states', function(data) {
      this.setState({
        data: [{abbr: '', name: 'Select a state'}].concat(data)
      });
    }.bind(this));
  },

  renderItems: function() {
    var self = this;
    // console.log(self.props.keyname);
    return this.state.data.map(function(value, i) {
      return (
        <option key={i} value={value[self.props.keyname || 'name']}>{value.name}</option>
      );
    });
  },

  handleOnChange: function(e) {
    var value = e.target.value;
    // console.log(value);
    this.setState({
      optionsState: value
    });
  },

  getValue: function() {
    return this.state.optionsState;
  },

  render: function() {
    return (
      <select className="state-options" value={this.state.optionsState} onChange={this.handleOnChange}>
        {this.renderItems()}
      </select>
    );
  }
});

//Component to render top navigation
var NavLinks = React.createClass({
  render: function() {
    return (
      <div className="nav-wrapper">
        <IndexLink to="/" className="brand-logo"><i className="material-icons">home</i>College Dashboard</IndexLink>
        <ul id="app-nav" className="right hide-on-med-and-down">
          <li><Link to="/home" activeClassName="active">Home</Link></li>
          <li><Link to="/stats" activeClassName="active">Loans</Link></li>
          <li><Link to="/highschools" activeClassName="active">Highschools</Link></li>
          <li><Link to="/admin" activeClassName="active">Admin</Link></li>
        </ul>
      </div>
    );
  }
});

//Component for left nav
var LeftNav = React.createClass({

  getInitialState: function() {
    return {
      value1: [470, 2310],
      value2: [13, 34],
      value3: [0, 51059]
    };
  },

  //Function to handle filter
  handleFilter: function() {
    $(document).trigger('change_range', {
      sat: this.state.value1,
      act: this.state.value2,
      tuition: this.state.value3,
      state: this.refs.state_option.getValue()
    });
  },

  //Function to handle lone filter
  handleLoan: function() {
    $(document).trigger('get_loan', {
      state: this.refs.state_option_loan.getValue()
    });
  },

  onChange: function(type, value) {
    // console.log(type);
    // console.log(value);
    if (type === 'sat') {
      this.setState({value1: value});
    } else if (type === 'act') {
      this.setState({value2: value});
    } else { //tuition
      this.setState({value3: value});
    }
  },

  renderHomeNav: function() {
    return (
      <div className="filter-collection">
        <h3>Adjust filter to view</h3>
        <StateSelect ref="state_option" />
        <div>
          <label>SAT score: [{this.state.value1[0] + ' - ' + this.state.value1[1]}]</label>
          <ReactSlider defaultValue={[470, 2310]} min={470} max={2310} onChange={this.onChange.bind(this, 'sat')} withBars className="horizontal-slider" pearling={true} />
          </div>
        <div>
          <label>ACT score: [{this.state.value2[0] + ' - ' + this.state.value2[1]}]</label>
          <ReactSlider defaultValue={[13, 34]} min={13} max={34} withBars onChange={this.onChange.bind(this, 'act')} className="horizontal-slider" pearling={true} />
        </div>
        <div>
          <label>Tuition($): [{formatCurrency(this.state.value3[0], 2) + ' - ' + formatCurrency(this.state.value3[1], 2)}]</label>
          <ReactSlider defaultValue={[0, 51059]} min={0} max={51059} onChange={this.onChange.bind(this, 'tuition')} withBars className="horizontal-slider" pearling={true} />
        </div>
        <button type="button" className="waves-effect waves-light btn" onClick={this.handleFilter}>Apply</button>
      </div>
    );
  },

  renderStatsNav: function() {
    return (
      <div className="filter-collection">
        <h3>Adjust to view loan stat</h3>
        <StateSelect ref="state_option_loan" keyname="abbr" />
        <button type="button" className="waves-effect waves-light btn" onClick={this.handleLoan}>Apply</button>
      </div>
    );
  },

  render: function() {
    if (this.props.page === 'home') {
      return this.renderHomeNav();
    } else {
      return this.renderStatsNav();
    }
  }
});

//Component render on index page
var Home = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      dataArr: [],
      LastKey: {},
      currState: '',
      page: 0,
      sat: [470, 2310],
      act: [13, 34],
      tuition: [0, 51059],
      empty_message: ''
    };
  },

  componentDidMount: function() {
    this.getData();
    $(document).bind('change_range', this.handleChangeRange);
  },

  handleChangeRange: function(e, params) {
    // console.log(params);
    this.setState({
      sat: params.sat.join(','),
      act: params.act.join(','),
      tuition: params.tuition.join(','),
      currState: params.state,
      page: 0,
      dataArr: [] //empty array collection
    }, this.getData);
  },

  getURL: function() {
    return '/data?sat=' + this.state.sat + '&act=' + this.state.act + '&tuition=' + this.state.tuition
                + '&state=' + this.state.currState + '&page=' + this.state.page;
  },

  getData: function() {
    if (this.state.loading === true) {
      return;
    }
    this.setState({
      loading: true
    });
    $.get(this.getURL(), function(resp) {
      this.setState({
        dataArr: this.state.dataArr.concat(resp.data),
        LastKey: resp.lastKey,
        loading: false,
        page: this.state.page + 1,
        empty_message: this.state.dataArr.concat(resp.data).length > 0 ? '' : 'No colleges data match with filter.'
      });
    }.bind(this));
  },

  loadMore: function() {
    this.getData();
  },

  renderHeader: function() {
    return (
      <div className="row collection-heading">
        <div className="col s4 item">Institution Name</div>
        <div className="col s1 item">Ranking</div>
        <div className="col s2 item">Acceptance Rate</div>
        <div className="col s2 item">SAT Score</div>
        <div className="col s2 item">ACT Score</div>
      </div>
    );
  },

  renderAccepetanceRate: function(value) {
    // console.log(value);
    if (value.acceptance_rate) {
      var data = [{
            value: value.acceptance_rate,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Accepted"
          },
          {
            value: Math.round((100 - value.acceptance_rate) * 100) / 100,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: ""
          }];
      var PieChart = Chart.React['Pie'];
      return (
        <div>
          <PieChart data={data} />
          <p className="percentage_text">{value.acceptance_rate + '%'}</p>
          <p>{value.number_of_applications} of applications</p>
        </div>
      );
    } else {
      return (
        <p>N/A</p>
      );
    }
  },

  renderSAT: function(value) {
    if (value.sat_score) {
      var percentage = Math.round(value.sat_score / 2310 * 100);
      var style = {
        width: percentage + '%'
      };
      return (
        <div className="sat score-view">
          <p className="score">{value.sat_score}</p>
          <div className="bar">
            <div style={style}></div>
          </div>
        </div>
      );
    } else {
      return (
        <p>N/A</p>
      );
    }
  },

  renderACT: function(value) {
    if (value.act_score) {
      var percentage = Math.round(value.act_score / 34 * 100);
      var style = {
        width: percentage + '%'
      };
      return (
        <div className="act score-view">
          <p className="score">{value.act_score}</p>
          <div className="bar">
            <div style={style}></div>
          </div>
        </div>
      );
    } else {
      return (
        <p>N/A</p>
      );
    }
  },

  // name: Joi.string(),
  // location: Joi.string(),
  // img: Joi.string(),
  // sat_score: Joi.number(),
  // act_score: Joi.number(),
  // tuition: Joi.number(),
  // ranking: Joi.string(),
  // acceptance_rate: Joi.number().default(null),
  // student_falculty_ratio: Joi.number().default(null),
  // median_salary: Joi.number(),
  // number_of_applications: Joi.number(),
  // total_student: Joi.number(),
  // graduation_rate: Joi.number()
  renderItem: function() {
    var self = this;
    return this.state.dataArr.map(function(value, i) {
      return (
        <div key={i} className="row item">
          <div className="col s4">
            <img src={"https://s3.graphiq.com/sites/default/files/10/media/images/t/" + value.img} />
            <div className="name">{value.name}</div>
            <div className="detail">
              <p>{value.location}</p>
              <p><em>Total Students:</em> {value.total_student}</p>
              <p><em>Tuition:</em> {value.tuition ? ('$' + formatCurrency(value.tuition, 2)) : 'N/A'}</p>
            </div>
          </div>
          <div className="col s1 item-ranking">
            <p>{parseInt(value.ranking, 10) ? ('#' + value.ranking) : 'N/A'}</p>
          </div>
          <div className="col s2">
            {self.renderAccepetanceRate(value)}
          </div>
          <div className="col s2">
            {self.renderSAT(value)}
          </div>
          <div className="col s2">
            {self.renderACT(value)}
          </div>
        </div>
      );
    });
  },

  renderButton: function() {
    if (this.state.loading === true) {
      return (
        <div className="loading"></div>
      );
    } else {
      if (!!this.state.empty_message) {
        return (
          <div className="empty-message">{this.state.empty_message}</div>
        );
      } else {
        return (
          <button type="button" onClick={this.loadMore} className="waves-effect waves-light btn-large">Load More...</button>
        );
      }
    }
  },

  render: function() {
    return (
      <div>
        <div className="left-rail hide-on-med-and-down">
          <LeftNav page="home" />
        </div>
        <div className="right-rail">
          {this.renderHeader()}
          <div className="college-collection">
            {this.renderItem()}
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
});

var Admin = React.createClass({

  setupInitialData: function() {
    this.data = ['file1.json', 'file2.json', 'file3.json', 'file4.json', 'file5.json'];
  },

  getInitialState: function() {
    this.setupInitialData();
    return {
      loading: false
    };
  },

  handleOnChange: function() {

  },

  updateTable: function(type) {
    if (this.state.loading === true) {
      return;
    }
    this.setState({ loading: true });
    $.ajax({
      type: 'POST',
      url: '/feed',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        type: type
      }),
      success: function() {
        this.setState({ loading: false });
        Materialize.toast('Load data to DynamoDB successfully', 4000) // 4000 is the duration of the toast
      },
      fail: function() {
        this.setState({ loading: false });
        Materialize.toast('Load data to DynamoDB successfully', 4000) // 4000 is the duration of the toast
      }
    });
  },

  renderItem: function() {
    var self = this;
    return this.data.map(function(value, i) {
      return (
        <p key={i}>
          <input onChange={self.handleOnChange} type="checkbox" name={value} value={value} id={value} />
          <label htmlFor={value}>{value}</label>
        </p>
      );
    });
  },

  render: function() {
    var buttonState = (this.state.loading === true) ? 'disabled' : '';
    return (
      <div className="container">
        <h2>Please choose a file to upload to database.</h2>
        <div className="row">
          <h4>Load College data</h4>
          <form className="col s6">
            {this.renderItem()}
            <button type="button" onClick={this.updateTable.bind(this, 'college')} className={"waves-effect waves-light btn-large " + buttonState}>Load College data</button>
          </form>
          <form className="col s6">
            <h4>Load Loan data</h4>
            <p>
              <input checked readOnly type="checkbox" name="loan.csv" value="loan.csv" id="loan.csv" />
              <label>loan.csv</label>
            </p>
            <button type="button" onClick={this.updateTable.bind(this, 'loan')} className={"waves-effect waves-light btn-large " + buttonState}>Load Loan data</button>
          </form>
          <form className="col s6">
            <h4>Load Highschool data</h4>
            <p>
              <textarea readOnly value="http://www.usnews.com/education/best-high-schools/articles/how-states-compare" />
            </p>
            <button type="button" onClick={this.updateTable.bind(this, 'highschool')} className={"waves-effect waves-light btn-large " + buttonState}>Load Highschool data</button>
          </form>
        </div>
      </div>
    );
  }
});

//Components displaying stats on loan page
var Stats = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      loanArr: [],
      currSearch: ''
    };
  },

  componentDidMount: function() {
    $(document).bind('get_loan', this.getData);
  },

  getData: function(e, params) {
    if (this.state.loading === true) {
      return;
    }
    this.setState({ loading: true });
    $.get('/data/loan/?state=' + params.state, function(resp) {
      this.setState({
        loanArr: this.state.loanArr.concat(resp.data),
        loading: false
      });
    }.bind(this));
  },

  handleSearchChange: function(e) {
    var value = e.target.value;
    console.log(value);
    this.setState({
      currSearch: value
    });
  },

  renderTableBody: function() {
    var self = this;
    return this.state.loanArr.map(function(value, i) {
      var hiddenState = (self.state.currSearch.length <= 3 ||
        (self.state.currSearch.length > 3 && value.name.toLowerCase().indexOf(self.state.currSearch.toLowerCase()) > -1)) ? '' : 'hidden';
      return (
        <tr key={i} className={hiddenState}>
          <td>{value.name}</td>
          <td>{value.school_type}</td>
          <td>${formatCurrency(value.federal_loan, 2)}</td>
          <td>${formatCurrency(value.federal_reimburse, 2)}</td>
          <td>{value.federal_recipient}</td>
          <td>${formatCurrency(value.grant_loan, 2)}</td>
          <td>${formatCurrency(value.grant_reimburse, 2)}</td>
          <td>{value.grant_recipient}</td>
        </tr>
      );
    });
  },

  render: function() {
    return (
      <div>
        <div className="left-rail hide-on-med-and-down">
          <LeftNav page="stats" />
        </div>
        <div className="right-rail row">
          <div className="input-field col s6">
            <input type="text" id="search" placeholder="Search school" onChange={this.handleSearchChange} />
            <label htmlFor="search">Search</label>
          </div>
          <table className="centered responsive-table">
            <thead>
              <tr>
                <th data-field="school_name">School Name</th>
                <th data-field="school_type">Type</th>
                <th data-field="federal_loan">Federal Loan</th>
                <th data-field="federal_reimburse">Federal reimburse</th>
                <th data-field="federal_recipient">Federal recepient</th>
                <th data-field="Grant_loan">Grant loan</th>
                <th data-field="federal_reimburse">Grant reimburse</th>
                <th data-field="federal_recipient">Grant recipient</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

//Components to display highschool draft
var Highschools = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      highschoolArr: []
    };
  },

  componentDidMount: function() {
    this.getHighschoolData();
  },

  getHighschoolData: function() {
    if (this.state.loading === true) {
      return;
    }
    this.setState({ loading: true });
    $.get('/data/highschool', function(resp) {
      this.setState({
        highschoolArr: this.state.highschoolArr.concat(resp.data),
      });
    }.bind(this));
  },

  renderHighschoolBarChart: function() {
    if (this.state.highschoolArr.length > 0) {
      var label = this.state.highschoolArr.map(function(value) {
        return value.state; //+ ': Eligible - ' + value.eligible_number + '; Qualified - ' + value.qualified_number;
      });
      var dataSet = this.state.highschoolArr.map(function(value) {
        return value.qualified_percentage;
      });
      var data = {
        labels: label,
        datasets: [{
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: dataSet
        }]
      };
      // console.log(data);
      var BarChart = Chart.React['Bar'];
      return (
        <BarChart data={data} />
      );
    }
  },

  render: function() {
    return (
      <div className="container">
        <h3>Highschool Performance Stats</h3>
        <div className="highschool-chart">
          {this.renderHighschoolBarChart()}
        </div>
      </div>
    );
  }
})

//Rendering app page
var App = React.createClass({
  // mixins: [Router.State],
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav id="navbar">
            <NavLinks />
          </nav>
        </div>
        {this.props.children}
      </div>
    );
  }
});

//Render component
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" name="app" component={App}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Admin} />
      <Route path="home" component={Home} />
      <Route path="stats" component={Stats} />
      <Route path="highschools" component={Highschools} />
    </Route>
  </Router>,
  app
);
