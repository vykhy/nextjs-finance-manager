import SwipeableTemporaryDrawer from "./SwipeableDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SwipeableTemporaryDrawer />
      {children}
    </div>
  );
};

export default Layout;
