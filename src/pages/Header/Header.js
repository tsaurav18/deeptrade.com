import './Header.css';

function Header() {
  return (
      <div className="header">
        <div className="col-2 logo">
          DeepTrade
        </div>
        <div className="col-10">
          <div className="menu">
            <div className="menu_item">
              What We Do
            </div>
            <div className="menu_item">
              Mission
            </div>
            <div className="menu_item">
              XPercent
            </div>
            <div className="menu_item">
              Technology
            </div>
            <div className="menu_item">
              News
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;