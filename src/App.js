import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo';
import './App.css';
import Clarifai from 'clarifai';
import ImageLinkForms from './components/ImageLinkForms/ImageLinkForms';
import Particles from 'react-particles-js';
import Signin from './components/signin/signin.js';
import Register from './components/Register/register.js';

const app = new Clarifai.App({
 apiKey: 'cc79aed2ea82428487b69c2d5ad2f43b'
});

const particle = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 900 
                }
          }
        }
      }

const initialState = {
        input: '',
        imageURL: '',
        box: {},
        route: 'signin',
        signedIn: false,
        user: {
          id:'',
          email:'',
          name: '',
          joined:'',
        }
}


class App extends Component {
    constructor() {
      super();
      this.state =initialState;
    }
       
       


    loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    }})
  }


    calculatefacebox = (data) =>  {
      const face = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return  {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height),
      }
      }

    displayFaceBox =(box) =>  {
      console.log(box);
      this.setState({box: box})
    }

    OnInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    onSubmit  = ()  =>  {
      this.setState({imageURL: this.state.input})
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>this.displayFaceBox(this.calculatefacebox(response)))
      .catch(err =>  console.log(err));
    }
    onRouteChange =(route) =>  {
      if(route === 'signout'){
        this.setState(initialState)
      }else if(route === 'home')  {
        this.setState({signedIn: true})
      }
      this.setState({route: route});
    }
  
  render() {
    return (
      <div className="App">
         <Particles className='particles' 
              params={particle} />
        <Navigation signedIn={this.state.signedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
        ?  <div>
            <Logo />
            <ImageLinkForms OnInputChange={this.OnInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
           </div>
        : (
            this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} /> 
        ) 
        }
      </div>
    );
  }
}


export default App;
