const e = React.createElement;
class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let tag = this.state.value;
    console.log('A name was submitted: ' + tag);
    
    event.preventDefault();
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
              <div>
                <label
                  >Keywords</label>
                <input
                  type="text"
                  id="userinputform"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" value="Submit">Add</button>
            </form>
    );
  }
}
const domContainer = document.querySelector('#info_form_container');
ReactDOM.render(e(InfoForm), domContainer);
