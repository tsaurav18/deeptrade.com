import './Partnership.css';

function Partnership() {
  return (
      <div className="partnership_container">
        <div className="row" style={{margin: '100px 0', justifyContent: 'center'}}>
            <div className="partnership_title">
                <div>Partnership</div>
            </div>
        </div>
        <div className="row gx-0" style={{padding: '0 550px'}}>
            <div className="col-4 partnership_icon">
                <img src="assets/news/news2.png" alt="img1" />
            </div>
            <div className="col-4 partnership_icon">
                <img src="assets/news/news2.png" alt="img1" />
            </div>
            <div className="col-4 partnership_icon">
                <img src="assets/news/news2.png" alt="img1" />
            </div>
        </div>
        <div>
            
        </div>
      </div>
  );
}

export default Partnership;