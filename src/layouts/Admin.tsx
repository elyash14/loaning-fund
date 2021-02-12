import { Container, styled } from "@material-ui/core";
import dynamic from "next/dynamic";
import theme from "../configs/theme";
const NavBar = dynamic(() => import("./admin/NavBar"));

const MainContainer = styled(Container)({
  marginTop: theme.spacing(4)
});

const AdminLayout = ({ children }) => {
  return (
    <>
    <NavBar/>
    <MainContainer maxWidth="lg" >
        {children}
    </MainContainer>
    </>
  );
};

export default AdminLayout;
