import React from 'react';
import img from '../../style/imgs/404.png';

class NotFound extends React.Component{
    state = {
        animate: ''
    };

    enter = () => {
        this.setState = ({animate: 'hinge'});
    }


    render() {
        return(
            <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
                <img src={img} alt="404" className={`animated swing ${this.state.animate}`} onMouseEnter={this.enter}/>
            </div>
        )
    }
}