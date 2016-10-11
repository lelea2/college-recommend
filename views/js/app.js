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
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/home" activeClassName="active">Home</Link></li>
          <li><Link to="/stat" activeClassName="active">Stats</Link></li>
          <li><Link to="/admin" activeClassName="active">Admin</Link></li>
        </ul>
      </div>
    );
  }
});

//Component for left nav
var LeftNav = React.createClass({

  render: function() {
    return (
      <div className="filter-collection">
        <div>
          <label>SAT score</label>
          <ReactSlider defaultValue={[470, 2310]} min={470} max={2310} withBars className="horizontal-slider" pearling={true} />
        </div>
        <div>
          <label>ACT score</label>
          <ReactSlider defaultValue={[13, 34]} min={13} max={34} withBars className="horizontal-slider" pearling={true} />
        </div>
      </div>
    );
  }

});

var App = React.createClass({
  mixins: [Router.State],
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


//Component render on index page
var Home = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      dataArr: [],
      LastKey: ''
    };
  },

  componentWillLeave: function() {

  },

  componentDidMount: function() {
    this.getData();
  },

  getURL: function() {
    return '/data' + (this.state.LastKey === '' ? '' : '?id=' + this.state.LastKey.id + '&sat_score=' + this.state.LastKey.sat_score);
  },

  getData: function() {
    $.get(this.getURL(), function(resp) {
      this.setState({
        dataArr: this.state.dataArr.concat(resp.data),
        LastKey: resp.lastKey
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

  render: function() {
    return (
      <div>
        <div className="left">
          <LeftNav />
        </div>
        <div className="right">
          {this.renderHeader()}
          <div className="college-collection">
            {this.renderItem()}
          </div>
          <button type="button" onClick={this.loadMore} className="waves-effect waves-light btn-large">Load More...</button>
        </div>
      </div>
    );
  }
});

var Admin = React.createClass({

  setupInitialData: function() {
    this.data = ['file1.json, file2.json, file3.json, file4.json, file5.json'];
  },

  componentWillLeave: function() {
    this.setupInitialData();
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div className="container">
        <h2>Please choose a file to upload to database.</h2>

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

