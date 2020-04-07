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
  }
  render() {
    const { error, catIsLoaded, catFile, dogIsLoaded, dogFile } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!catIsLoaded || !dogIsLoaded) {
      return <div>Loading...</div>;
    } else if (dogFile.includes(".mp4")) {
      return (
        <div>
          <img src={catFile} alt="cat" />;
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
      );
    } else {
      return (
        <div>
          <img src={catFile} alt="cat" />;
          <img src={dogFile} alt="dog" />;
        </div>
      );
    }
  }
}
export default Element;
