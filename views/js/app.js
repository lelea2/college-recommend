//Determine injected area
var app = document.querySelector("#content");

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
      tuition: this.state.value
    });
  },

  onChange: function(value, type) {
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
          <label>ACT score: [{this.state.value1[0] + ', ' + this.state.value1[1]}]</label>
          <ReactSlider defaultValue={[13, 34]} min={13} max={34} withBars onChange={this.onChange.bind(this, 'act')} className="horizontal-slider" pearling={true} />
        </div>
        <div>
          <label>Tuition: [{this.state.value2[0] + ', ' + this.state.value2[1]}]</label>
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
      LastKey: {}
    };
  },

  componentDidMount: function() {
    this.getData();
    $(document).bind('change_range', this.handleChangeRange);
  },

  handleChangeRange: function() {

  },

  getURL: function() {
    return '/data' + (this.state.LastKey === '' ? '' : '?id=' + this.state.LastKey.id + '&sat_score=' + this.state.LastKey.sat_score);
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
    return this.state.dataArr.map(function(value, i) {
      return (
        <div key={i} className="row item">
          <div className="col s4">
            <img src={"https://s3.graphiq.com/sites/default/files/10/media/images/t/" + value.img} />
            <div className="name">{value.name}</div>
            <div className="detail">
              <p>{value.location}</p>
              <p>Total Students: {value.total_student}</p>
            </div>
          </div>
          <div className="col s1 item-ranking">
            <p>{parseInt(value.ranking, 10) ? ('#' + value.ranking) : 'N/A'}</p>
          </div>
          <div className="col s2">

          </div>
          <div className="col s2">
          </div>
          <div className="col s2">
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
