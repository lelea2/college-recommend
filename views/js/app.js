//Determine injected area
var app = document.querySelector("#content");
Chart.defaults.global.responsive = true;

//Avoid duplication or React Router
var { Router,
      Route,
      IndexRoute,
      IndexLink,
      RouteHandler,
      Link } = ReactRouter;

//Component to render top navigation
var NavLinks = React.createClass({
  render: function() {
    return (
      <div className="nav-wrapper">
        <IndexLink to="/" className="brand-logo"><i className="material-icons">home</i>College Dashboard</IndexLink>
        <ul id="app-nav" className="right hide-on-med-and-down">
          <li><Link to="/home" activeClassName="active">Home</Link></li>
          <li><Link to="/stats" activeClassName="active">Stats</Link></li>
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
      tuition: this.state.value3
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

  render: function() {
    return (
      <div className="filter-collection">
        <h3>Adjust filter to view</h3>
        <div>
          <label>SAT score: [{this.state.value1[0] + ', ' + this.state.value1[1]}]</label>
          <ReactSlider defaultValue={[470, 2310]} min={470} max={2310} onChange={this.onChange.bind(this, 'sat')} withBars className="horizontal-slider" pearling={true} />
          </div>
        <div>
          <label>ACT score: [{this.state.value2[0] + ', ' + this.state.value2[1]}]</label>
          <ReactSlider defaultValue={[13, 34]} min={13} max={34} withBars onChange={this.onChange.bind(this, 'act')} className="horizontal-slider" pearling={true} />
        </div>
        <div>
          <label>Tuition($): [{this.state.value3[0] + ', ' + this.state.value3[1]}]</label>
          <ReactSlider defaultValue={[0, 51059]} min={0} max={51059} onChange={this.onChange.bind(this, 'tuition')} withBars className="horizontal-slider" pearling={true} />
        </div>
        <button type="button" className="waves-effect waves-light btn" onClick={this.handleFilter}>Apply</button>
      </div>
    );
  }
});

//Component render on index page
var Home = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      dataArr: [],
      LastKey: {},
      sat: [470, 2310],
      act: [13, 34],
      tuition: [0, 51059]
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
      dataArr: [] //empty array collection
    }, this.getData);
  },

  getURL: function() {
    return '/data?sat=' + this.state.sat + '&act=' + this.state.act + '&tuition=' + this.state.tuition;
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
        loading: false
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
      return (
        <button type="button" onClick={this.loadMore} className="waves-effect waves-light btn-large">Load More...</button>
      );
    }
  },

  render: function() {
    return (
      <div>
        <div className="left-rail hide-on-med-and-down">
          <LeftNav />
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

  updateTable: function() {

  },

  renderItem: function() {
    var self = this;
    return this.data.map(function(value, i) {
      return (
        <p>
          <input key={i} onChange={self.handleOnChange} type="checkbox" name={value} value={value} id={value} />
          <label htmlFor={value}>{value}</label>
        </p>
      );
    });
  },

  render: function() {
    return (
      <div className="container">
        <h2>Please choose a file to upload to database.</h2>
        <form>
          {this.renderItem()}
          <button type="button" onClick={this.updateTable} className="waves-effect waves-light btn-large">Load data</button>
        </form>
      </div>
    );
  }
});

var Stats = React.createClass({

  render: function() {
    return (
      <div className="container">
      </div>
    );
  }
});

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
  <Router>
    <Route path="/" name="app" component={App}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Admin} />
      <Route path="home" component={Home} />
      <Route path="stats" component={Stats} />
    </Route>
  </Router>,
  app
);
