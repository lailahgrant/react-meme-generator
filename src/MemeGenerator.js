import React, { Component } from 'react'

export default class MemeGenerator extends Component {

    constructor(){
        super();

        //  We initialize topText and bottomText as empty strings and randomImg as the provided URL.
        this.state = {
            topText :'',
            bottomText : '',
            randomImg : 'http://i.imgflip.com/1bij.jpg',
        //Now, we save the results to a new state property called allMemeImgs. To do this, we initialize allMemeImgs as an empty array.
            allMemeImgs: []
        };

        //we need to remember to bind the method in the constructor.
        this.handleChange = this.handleChange.bind(this);

        //We also need to bind handleSubmit() in our constructor().
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    //we make an API call to the provided URL and save the data returned (which is an array found in response.data.memes) 
    //to a new state property called allMemeImgs
    //When we need to load data from an endpoint to use in our component, a good place to make the request is the 
    //componentDidMount() lifecycle mtd as soon as the component mounts, we use the native fetch() fn to call to the provided URL
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
    //This returns a promise which we turn into a Javascript object with the .json() method.    
    .then( response => response.json()) //turn promise into JS object
    //Then we get the response which is useful to us by pulling the memes array from response.data.
    .then(response => {
        const {memes} = response.data //pull memes array from response.data
        console.log(memes[0]) //check data is present
        this.setState({ allMemeImgs: memes })
    })
    }

    //Now, we create the onChange handler, which will update the corresponding state on every change of the input field.
    //handleChange() fn wc receives an event
    handleChange(event){
        //console.log("welcome");

        //Now to fill in the handleChange() function. To do this, we want to pull the name and value properties from
        // event.target so that we can get the name of the state we are supposed to update (topText or bottomText) and 
        //the value which is typed into the box.
        const { name,value } = event.target;
        
        //We will now use these to update state. As we are not interested in what the previous state was, we can just 
        //provide an object in which we set the [name] to the value typed into the input field.
        this.setState({[name] : value});

    }

    handleSubmit(event) {
        event.preventDefault();

//Now, we need to get a random number, get the meme from that index and set randomImg to the .url of the random item.
//To get a random number, we use Math.floor(Math.random). To make sure that it is one of the indices in our 
//allMemeImgs array, we multiply by the length of the array.
     const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length);

     //We now set randMemeImg to equal allMemeImgs, with the index of allMemeImgs as the randomNumber we just got.
// We then add .url to the end of it.     
     const randMemeImg = this.state.allMemeImgs[randomNumber].url;   

//Now, all we need to do is update the state by updating the randomImg property with randMemeImg.
     this.setState({ randomImg : randMemeImg });    

      }

    render() {
        return (
            <div>

            <form className='meme-form' onSubmit={this.handleSubmit}>
                <input 
                type="text"
                name="topText"
                placeholder="Top Text"
                value={this.state.topText}
                onChange={this.handleChange}
                />
{/* Now, we set the onChange of both input fields to equal handleChange. */}
                <input 
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={this.state.bottomText}
                onChange={this.handleChange}
                />

                <button >Generate</button>

            </form>

            {/* Displaying a meme image alongside the top and bottom text */}
            <div className="meme">
            <img src={this.state.randomImg} alt='' />
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
            </div>

            </div>
        )
    }
}
