import React from 'react';
import Card from 'react-bootstrap/Card';

class Sponsored extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row mb-3 mt-1">
                    <div className="col-12 col-lg-9 mx-auto pl-0 pr-0">
                        <Card >
                            <Card.Header>Sponsored</Card.Header>
                            <Card.Body>
                            <div id="amzn-assoc-ad-2640f437-4f94-4d99-bfbb-12279c30d218"></div><script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=2640f437-4f94-4d99-bfbb-12279c30d218"></script>
                            </Card.Body>
                        </Card> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Sponsored;