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

    }

    render() {
        return (
            <div>

            <form>
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

            </div>
        )
    }
}
