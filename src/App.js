import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  state = {
    searchValue: "",
    meals: [],
    randommeal: []
  };

  handleOnChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  handleRandom = () => {
    this.makeRandomApiCall();
  };

  makeApiCall = searchInput => {
    let searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData.meals);
        this.setState({ meals: jsonData.meals });
        this.setState({ randommeal: [] });
      });
  };

  makeRandomApiCall = () => {
    let randomUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
    fetch(randomUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData.meals);
        this.setState({ meals: [] });
        this.setState({ randommeal: jsonData.meals });
      });
  };

  render() {
    return (
      <div>
        <h1> Meal search app </h1>
        <input
          name="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <button onClick={this.handleRandom}>Random</button>
        {this.state.randommeal ? (
          <div>
            {this.state.randommeal.map((meal, index) => (
              <div key={index}>
                <h1>{meal.strMeal}</h1>
                <h2>{meal.strArea}</h2>
                <img src={meal.strMealThumb} alt="meal-thumbnail" />
              </div>
            ))}
          </div>
        ) : (
          <p />
        )}
        {this.state.meals ? (
          <div>
            {this.state.meals.map((meal, index) => (
              <div key={index}>
                <h1>{meal.strMeal}</h1>
                <h2>{meal.strArea}</h2>
                <img src={meal.strMealThumb} alt="meal-thumbnail" />
              </div>
            ))}
          </div>
        ) : (
          <p>
            That meal is not in out database. <br /> Try searching for another
            meal
          </p>
        )}
      </div>
    );
  }
}

export default App;
