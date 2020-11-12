import React, {Component} from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import './UpdatePaintPage.css';

class UpdatePaintPage extends Component {
  state = {
    invalidForm: false,
    formData: this.props.location.state.paint,
    idx: this.props.location.idx,
    displayColorPicker: false,
    color: this.props.location.state.paint.color
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    let allData = this.state.formData
    allData['color'] = this.state.color
    this.props.handleUpdatePaint(allData, this.state.idx, this.props.location.state.paint._id);
  };

  handleChange = e => {
    if(e.target.name === 'isOwned'){
      e.target.value = !this.state.formData.isOwned
    } 
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  handleClick = () => {
    this.setState({ 
        displayColorPicker: !this.state.displayColorPicker
    })
  };

  handleClose = () => {
      this.setState({
          displayColorPicker: false
      })
  };

  handleColorChange = (color) => {
      this.setState({
          color: color.rgb
      })
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '8vmin',
          height: '3.5vmin',
          borderRadius: '.5vmin',          
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          border: 'solid',
          borderWidth: '.25vmin',
          borderRadius: '.5vmin',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <>
        <div className="title">
          <h2>Update {this.state.formData.colorName}</h2>
        </div>
        <center>
          <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit} className="form">
          <span>Paint Name</span>
                <br></br>
                <input
                    className="input"
                    type="text"
                    name="colorName"
                    value={this.state.formData.colorName}
                    onChange={this.handleChange}
                    autoComplete="off"
                />
                <br></br><br></br>
            <span>Color</span>
            <br></br>
              <div>
                <div
                    style={ styles.swatch }
                    onClick={ this.handleClick }
                >
                <div 
                    style={ styles.color }
                />
                </div>
                { this.state.displayColorPicker ? 
                    <div
                        style={ styles.popover }
                    >
                    <div 
                        style={ styles.cover }
                        onClick={ this.handleClose }
                    />
                    <SketchPicker
                        color={ this.state.color } onChange={ this.handleColorChange }
                    />
                    </div> 
                : 
                    null
                }
              </div>
            <br></br>
            <label>Type</label>
            <br></br>
            <select
                className="select"
                type="text"
                name="paintType"
                value={this.state.formData.paintType}
                onChange={this.handleChange}
            >
                <option>-</option>
                <option>Base</option>
                <option>Shade</option>
                <option>Layer</option>
                <option>Edge</option>
                <option>Glaze</option>
                <option>Technical</option>
                <option>Contrast</option>
                <option>Primer</option>
            </select>
            <br></br><br></br>
            <label>In Collection?</label>
            &nbsp;&nbsp;
            <input
              type="checkbox"
              className="switch"
              name="isOwned"
              checked={this.state.formData.isOwned}
              value={this.state.formData.isOwned}
              onChange={this.handleChange}
            />
            <br></br><br></br>
            <button
              type="submit"
              className="btn"
              disabled={this.state.invalidForm}
            >
              SAVE
            </button>
          </form>
          <br></br>
          <form
            action="/paintlist"
          >
            <input
              type="submit"
              value="CANCEL"
              className="btn"
            >
            </input>
          </form>
        </center>
      </>
    );
  };
};

export default UpdatePaintPage;
