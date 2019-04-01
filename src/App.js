import React, {
  Component
} from 'react';

import './App.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoad: false,
      results: [],
    }
  }

  // Fetch the data from the server
  componentDidMount() {
      fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoad: true,
          results: json.results
        })
      });
  } 
 
// Based on event adding Class
 handler = function(e){
    e.target.classList.add('true-value');
   
  };
  // Based on event adding Class
  wronghandler = function(e) {
    e.target.classList.add('wrong-value');
   
  };
 
  render() {
     var { isLoad,results, totallenght} = this.state;
     totallenght = results.length; 

     if(!isLoad) {
        // Loading screen
       return <div>Loading ..</div>
     } else if (totallenght === 0) {
      //  if Data is not there, we can show empty state
      return <div>Sorry. No data Available</div>
     } else {
      return (  
        <div className = "App">
        
          <div class="container"> 
            <h3>Trivia Game</h3>
              <ul class="que-container">
                  {results.map((result,index) => {
                   return  <ol key={index}> 
                   <h6 >{index+1}. {result.question}</h6>
                      <div class="align-left"> 
                    
                      <button type="radio"  
                        data-index={index} 
                        onClick={this.handler}
                        class="btn btn-outline-secondary answers">
                        {result.correct_answer}
                      </button>
                        
                      {result.incorrect_answers.map((incorrect) => {
                        return <button type="radio" 
                        key={incorrect} 
                        data-index={index} 
                          onClick={this.wronghandler} 
                          class="btn btn-outline-secondary answers">
                          {incorrect}
                            </button>
                        } )}
                        </div>
                        
                    </ol>
                  })};
              </ul>
            </div>
        </div>
      );
     }
  }
}
export default App;