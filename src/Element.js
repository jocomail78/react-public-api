import React from "react";

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      catIsLoaded: false,
      catFile: null,
      dogIsLoaded: false,
      dogFile: null,
      numberInfoIsLoaded: false,
      numberInfo: null,
    };
  }
  componentDidMount() {
    fetch("https://aws.random.cat/meow")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          catIsLoaded: true,
          catFile: result.file,
        });
      });

    fetch("https://random.dog/woof.json")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          dogIsLoaded: true,
          dogFile: result.url,
        });
      });
    fetch("http://numbersapi.com/" + Math.floor(Math.random() * 100))
      .then((response) => response.text())
      .then((res) => {
        this.setState({
          numberInfoIsLoaded: true,
          numberInfo: res,
        });
      });
  }
  render() {
    const {
      error,
      catIsLoaded,
      catFile,
      dogIsLoaded,
      dogFile,
      numberInfoIsLoaded,
      numberInfo,
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!catIsLoaded || !dogIsLoaded || !numberInfoIsLoaded) {
      return <div>Loading...</div>;
    } else if (dogFile.includes(".mp4")) {
      return (
        <div>
          <div className="full-line">
            <span>{numberInfo}</span>
          </div>
          <div className="image-left">
            <img src={catFile} alt="cat" />
          </div>
          <div className="image-right">
            <video width="400" controls>
              <source src={dogFile} />
              <track
                src=""
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
            </video>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="full-line">
            <span>{numberInfo}</span>
          </div>
          <div className="image-left">
            <img src={catFile} alt="cat" />
          </div>
          <div className="image-right">
            <img src={dogFile} alt="dog" />
          </div>
        </div>
      );
    }
  }
}
export default Element;
