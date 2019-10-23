import React from 'react'
const axios = require("axios");

class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            isUploaded: false,
            newName: ''
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clear = this.clear.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload",formData,config)
            .then((res) => {
                console.log(res.data);
                //alert(res.data);
                if(res.data){
                    this.setState({
                        isUploaded: true,
                        newName: res.data.data
                    });
                }
            }).catch((err) => {
                //alert(err);
                console.log(err);
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    clear(){
        this.setState({
            file: null,
            isUploaded: false,
            newName: ''
        });
    }

    render() {
        return (
            <div className="Upload">
                {this.state.isUploaded ? 
                <div className="after-upload" >
                    <div className="new-name">{this.state.newName}</div>
                    <div className="clear" onClick={this.clear}>еще</div>
                </div>
                : 
                <form onSubmit={this.onFormSubmit}>
                    <input type="file" name="file" onChange= {this.onChange} />
                    <button type="submit">Upload</button>
                </form>                 
                }


            </div>
        )
    }
}

export default Upload