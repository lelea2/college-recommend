var CommonSelectOptions = (function() {

  return React.createClass({
    displayName: 'CommonSelectOptions',

    propTypes: {
      moduleName: React.PropTypes.string,
      id: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      currOption: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      defaultSelect: React.PropTypes.string,
      options: React.PropTypes.array.isRequired,
      onChange: React.PropTypes.func,
      keyValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.func]).isRequired,
      keyId: React.PropTypes.string.isRequired,
      keyIndex: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      callbackParent: React.PropTypes.func,
      displayDetailValue: React.PropTypes.bool
    },

    getDefaultProps: function() {
      return {
        moduleName: '',
        id: '',
        label: '',
        currOption: '',
        defaultSelect: '',
        options: [],
        onChange: function() {},
        keyValue: 'name',
        keyId: 'id',
        keyIndex: false,
        disabled: false,
        displayDetailValue: true,
        callbackParent: function() {}
      };
    },

    getInitialState: function() {
      return {
        currOption: this.props.currOption,
        defaultSelect: this.props.defaultSelect
      };
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        currOption: nextProps.currOption,
        defaultSelect: nextProps.defaultSelect
      });
    },

    handleOnChange: function(e) {
      var target = e.target;
      this.props.onChange(e);
      this.setState({
        currOption: target.value
      });
      // console.log(target);
      if (this.props.callbackParent) {
        var data = {
          value: target.value,
          full_resp: JSON.parse(target.options[target.selectedIndex].getAttribute('data-value') || '{}'), //This is so bad, but currently we read these like this, should be in value data, and should not have full_resp
          ref: this.props.id
        };
        data[this.props.id] = target.value;
        this.props.callbackParent(data);
      }
    },

    renderLabel: function() {
      if (!!this.props.label) {
        return (
          <label htmlFor={this.props.id}>{this.props.label}</label>
        );
      }
    },

    renderOptions: function() {
      var self = this,
          optionsArr = self.props.options;
      var optionsArr = optionsArr.map(function(value, i) {
        var dataValue = (self.props.displayDetailValue === true) ? JSON.stringify(value) : '';
        if (typeof value !== "object") { //taking simple array for displaying
          var optionVal = (self.props.keyIndex === false) ? value : i;
          /*jshint ignore:start */
          return (
            <option key={i + 1} data-id={value} value={optionVal} data-value={dataValue}>{value}</option>
          );
          /*jshint ignore:end */
        } else if (typeof self.props.keyValue === 'function') {
          var keyVal = self.props.keyValue(value);
          /*jshint ignore:start */
          return (
            <option key={i + 1} data-id={value[self.props.keyId]} value={value[self.props.keyId]} data-value={dataValue}>{keyVal}</option>
          );
          /*jshint ignore:end */
        } else if (value[self.props.keyValue]) {
          /*jshint ignore:start */
          return (
            <option key={i + 1} data-id={value[self.props.keyId]} value={value[self.props.keyId]} data-value={dataValue}>{value[self.props.keyValue]}</option>
          );
          /*jshint ignore:end */
        }
      });
      //Adding default option if required
      if (!!self.state.defaultSelect) {
        var defaultOption = (function() {
          return (
            <option key={0} data-id="" value="" data-value="">{self.state.defaultSelect}</option>
          );
        }());
        optionsArr = [defaultOption].concat(optionsArr);
      }
      return optionsArr;
    },

    render: function() {
      return (
        <div className={"form-group " + this.props.moduleName} ref={this.props.id}>
          {this.renderLabel()}
          <select disabled={this.props.disabled} id={this.props.id} className="form-control" onChange={this.handleOnChange} value={this.state.currOption}>
            {this.renderOptions()}
          </select>
        </div>
      );
    }
  });
}());
